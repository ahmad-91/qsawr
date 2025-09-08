import React from 'react';
import styled from 'styled-components';

// Types
interface TableColumn {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select';
  options?: { value: string; label: string }[];
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  width?: string;
}

interface TableRow {
  id: string;
  [key: string]: any;
}

interface DynamicTableProps {
  columns: TableColumn[];
  data: TableRow[];
  onAdd: () => void;
  onUpdate: (id: string, field: string, value: any) => void;
  onRemove: (id: string) => void;
  addButtonText?: string;
  className?: string;
}

// Styled Components
const Table = styled.div`
  background: ${({ theme }) => theme.colors.surface[0]};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  margin-bottom: 1rem;
`;

const TableHeader = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`} auto;
  gap: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.surface[1]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface.divider};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const TableRow = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`} auto;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface.divider};
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

const TableInput = styled.input`
  margin: 0;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.surface[0]};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary.default};
    box-shadow: 0 0 0 3px rgba(59,130,246,0.4);
  }
`;

const TableSelect = styled.select`
  margin: 0;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.surface[0]};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary.default};
    box-shadow: 0 0 0 3px rgba(59,130,246,0.4);
  }
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: ${({ theme }) => theme.colors.error[500]};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.error[600]};
    transform: scale(1.1);
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.primary.default};
  color: ${({ theme }) => theme.colors.text.onBrand};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.hover};
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59,130,246,0.4);
  }
`;

// Component
const DynamicTable: React.FC<DynamicTableProps> = ({
  columns,
  data,
  onAdd,
  onUpdate,
  onRemove,
  addButtonText = 'إضافة عنصر جديد',
  className
}) => {
  const renderCell = (row: TableRow, column: TableColumn) => {
    const value = row[column.key];

    switch (column.type) {
      case 'number':
        return (
          <TableInput
            type="number"
            value={value || ''}
            onChange={(e) => onUpdate(row.id, column.key, parseFloat(e.target.value) || 0)}
            min={column.min}
            max={column.max}
            step={column.step}
            placeholder={column.placeholder}
          />
        );
      case 'select':
        return (
          <TableSelect
            value={value || ''}
            onChange={(e) => onUpdate(row.id, column.key, e.target.value)}
          >
            {column.placeholder && <option value="">{column.placeholder}</option>}
            {column.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TableSelect>
        );
      default:
        return (
          <TableInput
            type="text"
            value={value || ''}
            onChange={(e) => onUpdate(row.id, column.key, e.target.value)}
            placeholder={column.placeholder}
          />
        );
    }
  };

  return (
    <div className={className}>
      <Table>
        <TableHeader columns={columns.length}>
          {columns.map((column) => (
            <div key={column.key}>{column.label}</div>
          ))}
          <div>إجراءات</div>
        </TableHeader>
        
        {data.map((row) => (
          <TableRow key={row.id} columns={columns.length}>
            {columns.map((column) => (
              <div key={column.key}>
                {renderCell(row, column)}
              </div>
            ))}
            <RemoveButton
              type="button"
              onClick={() => onRemove(row.id)}
              title="حذف العنصر"
            >
              🗑️
            </RemoveButton>
          </TableRow>
        ))}
      </Table>

      <AddButton type="button" onClick={onAdd}>
        ➕ {addButtonText}
      </AddButton>
    </div>
  );
};

export default DynamicTable;
