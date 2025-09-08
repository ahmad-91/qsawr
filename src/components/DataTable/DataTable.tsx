import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { DataTableProps, DataTableColumn, SortConfig } from './types';
import { DataTableProvider } from './DataTableContext';
import { useDataTable } from './DataTableContext';
import { ActionButton, DataTableActionGroup } from './ActionButtons';
import { DataTableErrorBoundary } from './ErrorBoundary';
import { ShimmerTable, ShimmerTableHeader, ShimmerDataTableCard } from './ShimmerLoading';
import { useVirtualScrolling } from './hooks/useVirtualScrolling';
import * as S from './DataTableStyles';

// Search Component - Memoized for performance
const SearchComponent = memo<{
  placeholder?: string;
  onSearch?: (term: string) => void;
}>(({ placeholder = "البحث...", onSearch }) => {
  const { searchTerm, setSearchTerm } = useDataTable();

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch?.(term);
  }, [setSearchTerm, onSearch]);

  return (
    <S.SearchContainer>
      <S.SearchIcon>🔍</S.SearchIcon>
      <S.SearchInput
        value={searchTerm}
        onChange={handleSearch}
        placeholder={placeholder}
        aria-label="البحث في الجدول"
      />
    </S.SearchContainer>
  );
});

// Pagination Component - Memoized for performance
const PaginationComponent = memo<{
  total: number;
  current: number;
  pageSize: number;
  showSizeChanger?: boolean;
  showTotal?: boolean;
  onChange?: (page: number, size: number) => void;
}>(({ total, current, pageSize, showSizeChanger, showTotal, onChange }) => {
  const { setCurrentPage, setPageSize } = useDataTable();
  
  const totalPages = Math.ceil(total / pageSize);
  const startRecord = (current - 1) * pageSize + 1;
  const endRecord = Math.min(current * pageSize, total);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    onChange?.(page, pageSize);
  }, [setCurrentPage, onChange, pageSize]);

  const handleSizeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value);
    setPageSize(newSize);
    setCurrentPage(1);
    onChange?.(1, newSize);
  }, [setPageSize, setCurrentPage, onChange]);

  const renderPageNumbers = useCallback(() => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, current - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <S.PaginationButton
          key={i}
          active={i === current}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </S.PaginationButton>
      );
    }

    return pages;
  }, [current, totalPages, handlePageChange]);

  return (
    <S.PaginationContainer>
      <S.PaginationInfo>
        {showTotal && (
          <span>
            عرض {startRecord} إلى {endRecord} من أصل {total} سجل
          </span>
        )}
      </S.PaginationInfo>
      
      <S.PaginationControls>
        {showSizeChanger && (
          <select value={pageSize} onChange={handleSizeChange}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        )}
        
        <S.PaginationButton
          disabled={current <= 1}
          onClick={() => handlePageChange(current - 1)}
        >
          السابق
        </S.PaginationButton>
        
        {renderPageNumbers()}
        
        <S.PaginationButton
          disabled={current >= totalPages}
          onClick={() => handlePageChange(current + 1)}
        >
          التالي
        </S.PaginationButton>
      </S.PaginationControls>
    </S.PaginationContainer>
  );
});

// Main DataTable Component
const DataTableInner = <T = any,>({
  data,
  columns,
  rowKey = 'id',
  search,
  pagination,
  sorting,
  selection,
  actions = [],
  bulkActions = [],
  export: exportConfig,
  loading,
  emptyState,
  size = 'md',
  bordered = true,
  striped = true,
  hoverable = true,
  sticky = true,
  className,
  tableClassName,
  onRowClick,
  onRowDoubleClick,
  onSort,
  onSearch,
  onPaginationChange,
  serverSide,
}: DataTableProps<T>) => {
  const {
    searchTerm,
    currentPage,
    pageSize,
    sortConfig,
    setSortConfig,
    selectedRowKeys,
    setSelectedRowKeys,
  } = useDataTable();

  // Filter and search data - Improved safety and performance
  const filteredData = useMemo(() => {
    if (!search?.enabled || !searchTerm?.trim()) return data;

    const lowerSearchTerm = searchTerm.toLowerCase().trim();
    
    return data.filter((record: T) => {
      try {
        if (search.customSearch) {
          return search.customSearch(searchTerm, record);
        }

        // Default search implementation with safety checks
        const searchableColumns = search.searchableColumns || 
          columns.filter(col => col.searchable !== false).map(col => col.key);

        return searchableColumns.some(columnKey => {
          const column = columns.find(col => col.key === columnKey);
          if (!column || !column.dataIndex) return false;

          const value = record[column.dataIndex as keyof T];
          
          // Safe value conversion with null/undefined checks
          if (value === null || value === undefined) return false;
          
          let stringValue: string;
          try {
            stringValue = String(value).toLowerCase();
          } catch {
            return false;
          }
          
          return stringValue.includes(lowerSearchTerm);
        });
      } catch (error) {
        console.warn('Search error for record:', record, error);
        return false;
      }
    });
  }, [data, searchTerm, search, columns]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.field || !sortConfig.order) return filteredData;

    return [...filteredData].sort((a: T, b: T) => {
      const column = columns.find(col => col.key === sortConfig.field);
      if (!column || !column.dataIndex) return 0;

      const aValue = a[column.dataIndex as keyof T];
      const bValue = b[column.dataIndex as keyof T];

      if (aValue < bValue) return sortConfig.order === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig, columns]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination?.enabled) return sortedData;

    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize, pagination]);

  // Handle column sort - Memoized for performance
  const handleSort = useCallback((columnKey: string) => {
    const column = columns.find(col => col.key === columnKey);
    if (!column || !column.sortable) return;

    const newOrder: 'asc' | 'desc' = 
      sortConfig.field === columnKey && sortConfig.order === 'asc' 
        ? 'desc' 
        : 'asc';

    const newConfig: SortConfig = { field: columnKey, order: newOrder };
    setSortConfig(newConfig);
    onSort?.(columnKey, newOrder);
  }, [columns, sortConfig.field, sortConfig.order, setSortConfig, onSort]);

  // Handle row selection - Memoized for performance
  const handleRowSelection = useCallback((record: T, checked: boolean) => {
    const key = typeof rowKey === 'function' ? rowKey(record) : record[rowKey as keyof T] as string | number;
    
    if (checked) {
      setSelectedRowKeys((prev: (string | number)[]) => [...prev, key]);
    } else {
      setSelectedRowKeys((prev: (string | number)[]) => prev.filter((k: string | number) => k !== key));
    }
  }, [rowKey, setSelectedRowKeys]);

  // Handle select all - Memoized for performance
  const handleSelectAll = useCallback((checked: boolean) => {
    if (checked) {
      const allKeys = paginatedData.map((record: T) => 
        typeof rowKey === 'function' ? rowKey(record) : record[rowKey as keyof T] as string | number
      );
      setSelectedRowKeys(allKeys);
    } else {
      setSelectedRowKeys([]);
    }
  }, [paginatedData, rowKey, setSelectedRowKeys]);

  // Get row key - Memoized for performance
  const getRowKey = useCallback((record: T) => {
    return typeof rowKey === 'function' ? rowKey(record) : record[rowKey as keyof T] as string | number;
  }, [rowKey]);

  // Render cell content - Memoized for performance
  const renderCell = useCallback((column: DataTableColumn<T>, record: T, index: number) => {
    try {
      if (column.render) {
        return column.render(record[column.dataIndex as keyof T], record, index);
      }
      
      if (column.dataIndex) {
        const value = record[column.dataIndex as keyof T];
        return value !== null && value !== undefined ? String(value) : '-';
      }
      
      return '-';
    } catch (error) {
      console.warn('Cell render error:', error);
      return '-';
    }
  }, []);

  // Virtual scrolling configuration
  const virtualScrollConfig = useMemo(() => {
    if (!serverSide?.enabled) return null;
    
    return {
      itemHeight: size === 'sm' ? 48 : size === 'lg' ? 72 : 60,
      containerHeight: 400, // Default height, can be customizable
      totalItems: paginatedData.length,
    };
  }, [serverSide?.enabled, size, paginatedData.length]);

  const virtualScrolling = useVirtualScrolling(
    virtualScrollConfig || {
      itemHeight: 60,
      containerHeight: 400,
      totalItems: 0,
    }
  );

  // Determine which data to render (virtual or normal)
  const displayData = useMemo(() => {
    if (!virtualScrollConfig) {
      return paginatedData;
    }
    
    return paginatedData.slice(
      virtualScrolling.startIndex,
      virtualScrolling.endIndex + 1
    );
  }, [virtualScrollConfig, paginatedData, virtualScrolling.startIndex, virtualScrolling.endIndex]);

  // Export functionality
  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    if (exportConfig?.customExport) {
      exportConfig.customExport(filteredData, format);
      return;
    }

    // Default CSV export
    if (format === 'csv') {
      const headers = columns.map(col => col.title).join(',');
      const rows = filteredData.map((record: T) => 
        columns.map(col => {
          const value = col.dataIndex ? record[col.dataIndex as keyof T] : '';
          return typeof value === 'string' ? `"${value}"` : value;
        }).join(',')
      );
      
      const csvContent = [headers, ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${exportConfig?.filename || 'data'}.csv`;
      link.click();
    }
  };

  return (
    <S.DataTableContainer size={size} className={className}>
      {/* Header with Search and Actions */}
      <S.DataTableHeader>
        <S.HeaderLeft>
          {search?.enabled && (
            <SearchComponent
              placeholder={search.placeholder}
              onSearch={onSearch}
            />
          )}
        </S.HeaderLeft>
        
        <S.HeaderRight>
          {exportConfig?.enabled && (
            <DataTableActionGroup align="right">
              {exportConfig.formats?.includes('csv') && (
                <ActionButton
                  variant="secondary"
                  size="sm"
                  icon="📊"
                  tooltip="تصدير CSV"
                  onClick={() => handleExport('csv')}
                >
                  CSV
                </ActionButton>
              )}
              {exportConfig.formats?.includes('excel') && (
                <ActionButton
                  variant="secondary"
                  size="sm"
                  icon="📈"
                  tooltip="تصدير Excel"
                  onClick={() => handleExport('excel')}
                >
                  Excel
                </ActionButton>
              )}
              {exportConfig.formats?.includes('pdf') && (
                <ActionButton
                  variant="secondary"
                  size="sm"
                  icon="📄"
                  tooltip="تصدير PDF"
                  onClick={() => handleExport('pdf')}
                >
                  PDF
                </ActionButton>
              )}
            </DataTableActionGroup>
          )}
        </S.HeaderRight>
      </S.DataTableHeader>

      {/* Bulk Actions */}
      {selection?.enabled && selectedRowKeys.length > 0 && bulkActions.length > 0 && (
        <S.ActionsBar>
          <span style={{ 
            marginLeft: '1rem',
            color: '#6B7280',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            تم تحديد {selectedRowKeys.length} عنصر
          </span>
          <DataTableActionGroup>
            {bulkActions.map(action => {
              const getVariant = (variant?: string) => {
                switch (variant) {
                  case 'error': return 'danger';
                  case 'warning': return 'secondary';
                  case 'info': return 'tertiary';
                  case 'success': return 'primary';
                  default: return variant as any || 'secondary';
                }
              };
              
              return (
                <ActionButton
                  key={action.key}
                  variant={getVariant(action.variant)}
                  size="sm"
                  icon={action.icon}
                  disabled={action.disabled?.([])}
                  onClick={() => {
                    const selectedRows = paginatedData.filter((record: T) =>
                      selectedRowKeys.includes(getRowKey(record))
                    );
                    action.onClick(selectedRows, selectedRowKeys);
                  }}
                >
                  {action.label}
                </ActionButton>
              );
            })}
          </DataTableActionGroup>
        </S.ActionsBar>
      )}

      {/* Table */}
      <S.TableWrapper>
        <S.Table
          bordered={bordered}
          striped={striped}
          size={size}
          className={tableClassName}
        >
          <S.TableHeader sticky={sticky}>
            <tr>
              {selection?.enabled && (
                <S.TableHeaderCell width="50px">
                  <S.SelectionCheckbox
                    checked={selectedRowKeys.length === paginatedData.length && paginatedData.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </S.TableHeaderCell>
              )}
              
              {columns.map(column => (
                <S.TableHeaderCell
                  key={column.key}
                  align={column.align}
                  sortable={column.sortable}
                  width={column.width}
                  minWidth={column.minWidth}
                  className={`${column.headerClassName || ''} ${
                    sortConfig.field === column.key 
                      ? `sort-${sortConfig.order}` 
                      : ''
                  }`}
                  onClick={() => handleSort(column.key)}
                >
                  {column.title}
                </S.TableHeaderCell>
              ))}
              
              {actions.length > 0 && (
                <S.TableHeaderCell width="120px" align="center">
                  الإجراءات
                </S.TableHeaderCell>
              )}
            </tr>
          </S.TableHeader>

          <S.TableBody>
            {loading?.loading ? (
              <>
                {loading.skeleton ? (
                  <ShimmerTable 
                    rows={pageSize || 10}
                    columns={columns.length}
                    hasActions={actions.length > 0}
                    hasSelection={selection?.enabled}
                  />
                ) : (
                  <tr>
                    <td colSpan={columns.length + (selection?.enabled ? 1 : 0) + (actions.length > 0 ? 1 : 0)}>
                      <S.LoadingContainer>
                        🔄 {loading.loadingText || 'جاري التحميل...'}
                      </S.LoadingContainer>
                    </td>
                  </tr>
                )}
              </>
            ) : displayData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selection?.enabled ? 1 : 0) + (actions.length > 0 ? 1 : 0)}>
                  <S.EmptyContainer>
                    <S.EmptyIcon>📭</S.EmptyIcon>
                    <S.EmptyText>
                      {emptyState?.emptyText || 'لا توجد بيانات'}
                    </S.EmptyText>
                    {emptyState?.emptyDescription && (
                      <S.EmptyDescription>
                        {emptyState.emptyDescription}
                      </S.EmptyDescription>
                    )}
                    {emptyState?.emptyAction}
                  </S.EmptyContainer>
                </td>
              </tr>
            ) : (
              <>
                {virtualScrollConfig && (
                  <div 
                    style={{ 
                      height: virtualScrolling.offsetY,
                      width: '100%' 
                    }} 
                  />
                )}
                {displayData.map((record, index) => {
                  const actualIndex = virtualScrollConfig ? virtualScrolling.startIndex + index : index;
                  const key = getRowKey(record);
                  const isSelected = selectedRowKeys.includes(key);
                  
                  return (
                    <S.TableRow
                      key={key}
                      hoverable={hoverable}
                      striped={striped}
                      index={actualIndex}
                      selected={isSelected}
                      onClick={() => onRowClick?.(record, actualIndex)}
                      onDoubleClick={() => onRowDoubleClick?.(record, actualIndex)}
                      role="row"
                      aria-selected={isSelected}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onRowClick?.(record, actualIndex);
                        }
                      }}
                    >
                    {selection?.enabled && (
                      <S.TableCell>
                        <S.SelectionCheckbox
                          checked={isSelected}
                          onChange={(e) => handleRowSelection(record, e.target.checked)}
                          disabled={selection.getCheckboxProps?.(record)?.disabled}
                        />
                      </S.TableCell>
                    )}
                    
                    {columns.map(column => (
                      <S.TableCell
                        key={column.key}
                        align={column.align}
                        ellipsis={column.ellipsis}
                        className={column.className}
                      >
                        {renderCell(column, record, index)}
                      </S.TableCell>
                    ))}
                    
                    {actions.length > 0 && (
                      <S.TableCell align="center">
                        <DataTableActionGroup align="center">
                          {actions.map(action => {
                            if (action.hidden?.(record)) return null;
                            
                            const getVariant = (variant?: string) => {
                              switch (variant) {
                                case 'error': return 'danger';
                                case 'warning': return 'secondary';
                                case 'info': return 'tertiary';
                                case 'success': return 'primary';
                                default: return variant as any || 'ghost';
                              }
                            };
                            
                            return (
                              <ActionButton
                                key={action.key}
                                variant={getVariant(action.variant)}
                                size={action.size || 'sm'}
                                icon={action.icon}
                                disabled={action.disabled?.(record)}
                                tooltip={action.label}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  action.onClick(record, actualIndex);
                                }}
                              />
                            );
                          })}
                        </DataTableActionGroup>
                      </S.TableCell>
                    )}
                  </S.TableRow>
                );
                })}
              </>
            )}
          </S.TableBody>
        </S.Table>
      </S.TableWrapper>

      {/* Pagination */}
      {pagination?.enabled && (
        <PaginationComponent
          total={sortedData.length}
          current={currentPage}
          pageSize={pageSize}
          showSizeChanger={pagination.showSizeChanger}
          showTotal={pagination.showTotal}
          onChange={onPaginationChange}
        />
      )}
    </S.DataTableContainer>
  );
};

// Main DataTable with Provider and Error Boundary
function DataTable<T = any>(props: DataTableProps<T>) {
  // Show full shimmer card loading if loading is enabled
  if (props.loading?.loading && props.loading.skeleton) {
    return <ShimmerDataTableCard />;
  }

  return (
    <DataTableErrorBoundary
      onError={(error, errorInfo) => {
        console.error('DataTable Error:', error);
        console.error('Error Info:', errorInfo);
        // You can add error reporting here (e.g., Sentry, LogRocket)
      }}
    >
      <DataTableProvider>
        <DataTableInner<T> {...props} />
      </DataTableProvider>
    </DataTableErrorBoundary>
  );
}

export default DataTable;
