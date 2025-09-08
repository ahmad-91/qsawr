import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { DataTableContextValue, SortConfig } from './types';

const DataTableContext = createContext<DataTableContextValue | undefined>(undefined);

interface DataTableProviderProps {
  children: ReactNode;
}

export const DataTableProvider: React.FC<DataTableProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState<SortConfig>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
  const [filters, setFilters] = useState<Record<string, any>>({});

  const value: DataTableContextValue = {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    sortConfig,
    setSortConfig,
    selectedRowKeys,
    setSelectedRowKeys,
    filters,
    setFilters,
  };

  return (
    <DataTableContext.Provider value={value}>
      {children}
    </DataTableContext.Provider>
  );
};

export const useDataTable = (): DataTableContextValue => {
  const context = useContext(DataTableContext);
  if (context === undefined) {
    throw new Error('useDataTable must be used within a DataTableProvider');
  }
  return context;
};
