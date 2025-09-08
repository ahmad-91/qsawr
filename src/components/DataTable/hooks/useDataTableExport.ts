import { useCallback } from 'react';

export interface ExportOptions {
  filename?: string;
  dateFormat?: string;
}

export const useDataTableExport = () => {
  const exportToCSV = useCallback((data: any[], columns: any[], options: ExportOptions = {}) => {
    const { filename = 'data' } = options;
    
    // Create CSV headers
    const headers = columns.map(col => col.title).join(',');
    
    // Create CSV rows
    const rows = data.map(record => 
      columns.map(col => {
        let value = col.dataIndex ? record[col.dataIndex] : '';
        
        // Handle different data types
        if (value === null || value === undefined) {
          value = '';
        } else if (typeof value === 'object') {
          value = JSON.stringify(value);
        } else if (typeof value === 'string') {
          // Escape quotes and wrap in quotes if contains comma
          value = value.includes(',') || value.includes('"') 
            ? `"${value.replace(/"/g, '""')}"` 
            : value;
        }
        
        return value;
      }).join(',')
    );
    
    const csvContent = [headers, ...rows].join('\n');
    
    // Add BOM for Arabic support
    const bom = '\uFEFF';
    const blob = new Blob([bom + csvContent], { 
      type: 'text/csv;charset=utf-8;' 
    });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const exportToJSON = useCallback((data: any[], options: ExportOptions = {}) => {
    const { filename = 'data' } = options;
    
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const printTable = useCallback((data: any[], columns: any[], title?: string) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const tableHTML = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>${title || 'طباعة الجدول'}</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            direction: rtl;
            margin: 20px;
          }
          h1 {
            text-align: center;
            color: #333;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: right;
          }
          th {
            background-color: #f5f5f5;
            font-weight: bold;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          @media print {
            body { margin: 0; }
            h1 { page-break-after: avoid; }
            table { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        ${title ? `<h1>${title}</h1>` : ''}
        <table>
          <thead>
            <tr>
              ${columns.map(col => `<th>${col.title}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${data.map(record => `
              <tr>
                ${columns.map(col => {
                  let value = col.dataIndex ? record[col.dataIndex] : '';
                  if (value === null || value === undefined) value = '';
                  return `<td>${value}</td>`;
                }).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            };
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(tableHTML);
    printWindow.document.close();
  }, []);

  return {
    exportToCSV,
    exportToJSON,
    printTable,
  };
};
