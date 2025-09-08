import { ReactNode } from 'react';

// Column Definition
export interface DataTableColumn<T = any> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  sortable?: boolean;
  filterable?: boolean;
  searchable?: boolean;
  render?: (value: any, record: T, index: number) => ReactNode;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
  ellipsis?: boolean;
  className?: string;
  headerClassName?: string;
}

// Table Actions
export interface TableAction<T = any> {
  key: string;
  label: string;
  icon?: ReactNode;
  onClick: (record: T, index: number) => void;
  disabled?: (record: T) => boolean;
  hidden?: (record: T) => boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

// Search Configuration
export interface SearchConfig {
  enabled: boolean;
  placeholder?: string;
  searchableColumns?: string[];
  customSearch?: (searchTerm: string, record: any) => boolean;
  debounceMs?: number;
}

// Pagination Configuration
export interface PaginationConfig {
  enabled: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: boolean;
  position?: 'top' | 'bottom' | 'both';
}

// Sorting Configuration
export interface SortConfig {
  field?: string;
  order?: 'asc' | 'desc';
}

// Filter Configuration
export interface FilterConfig {
  enabled: boolean;
  filters?: Record<string, any>;
}

// Export Configuration
export interface ExportConfig {
  enabled: boolean;
  formats?: ('csv' | 'excel' | 'pdf')[];
  filename?: string;
  customExport?: (data: any[], format: string) => void;
}

// Selection Configuration
export interface SelectionConfig<T = any> {
  enabled: boolean;
  type?: 'checkbox' | 'radio';
  selectedRowKeys?: (string | number)[];
  onChange?: (selectedRowKeys: (string | number)[], selectedRows: T[]) => void;
  getCheckboxProps?: (record: T) => { disabled?: boolean };
}

// Bulk Actions
export interface BulkAction<T = any> {
  key: string;
  label: string;
  icon?: ReactNode;
  onClick: (selectedRows: T[], selectedRowKeys: (string | number)[]) => void;
  disabled?: (selectedRows: T[]) => boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
}

// Loading States
export interface LoadingConfig {
  loading?: boolean;
  skeleton?: boolean;
  spinnerSize?: 'sm' | 'md' | 'lg';
  loadingText?: string;
}

// Empty State
export interface EmptyStateConfig {
  emptyText?: string;
  emptyIcon?: ReactNode;
  emptyDescription?: string;
  emptyAction?: ReactNode;
}

// Main DataTable Props
export interface DataTableProps<T = any> {
  // Data
  data: T[];
  columns: DataTableColumn<T>[];
  rowKey?: string | ((record: T) => string | number);
  
  // Features
  search?: SearchConfig;
  pagination?: PaginationConfig;
  sorting?: SortConfig;
  filtering?: FilterConfig;
  selection?: SelectionConfig<T>;
  actions?: TableAction<T>[];
  bulkActions?: BulkAction<T>[];
  export?: ExportConfig;
  
  // UI Configuration
  loading?: LoadingConfig;
  emptyState?: EmptyStateConfig;
  size?: 'sm' | 'md' | 'lg';
  bordered?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  sticky?: boolean;
  virtualScroll?: boolean;
  
  // Styling
  className?: string;
  tableClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  rowClassName?: string | ((record: T, index: number) => string);
  
  // Events
  onRowClick?: (record: T, index: number) => void;
  onRowDoubleClick?: (record: T, index: number) => void;
  onSort?: (field: string, order: 'asc' | 'desc') => void;
  onFilter?: (filters: Record<string, any>) => void;
  onSearch?: (searchTerm: string) => void;
  onPaginationChange?: (page: number, pageSize: number) => void;
  
  // Server-side operations
  serverSide?: {
    enabled: boolean;
    totalRecords?: number;
    onServerSearch?: (searchTerm: string) => Promise<void>;
    onServerSort?: (field: string, order: 'asc' | 'desc') => Promise<void>;
    onServerFilter?: (filters: Record<string, any>) => Promise<void>;
    onServerPagination?: (page: number, pageSize: number) => Promise<void>;
  };
}

// Context Types
export interface DataTableContextValue {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  sortConfig: SortConfig;
  setSortConfig: (config: SortConfig) => void;
  selectedRowKeys: (string | number)[];
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<(string | number)[]>>;
  filters: Record<string, any>;
  setFilters: (filters: Record<string, any>) => void;
}
