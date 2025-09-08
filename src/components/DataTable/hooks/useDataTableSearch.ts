import { useState, useCallback, useMemo } from 'react';
import { DataTableColumn } from '../types';

export interface SearchFilters {
  [key: string]: any;
}

export const useDataTableSearch = <T = any>(
  data: T[],
  columns: DataTableColumn<T>[],
  options: {
    searchableColumns?: string[];
    customSearch?: (searchTerm: string, record: T, filters: SearchFilters) => boolean;
    debounceMs?: number;
  } = {}
) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounced search
  const updateSearch = useCallback((term: string) => {
    setSearchTerm(term);
    
    if (options.debounceMs) {
      const timer = setTimeout(() => {
        setDebouncedSearchTerm(term);
      }, options.debounceMs);
      
      return () => clearTimeout(timer);
    } else {
      setDebouncedSearchTerm(term);
    }
  }, [options.debounceMs]);

  // Get searchable columns
  const searchableColumns = useMemo(() => {
    return options.searchableColumns || 
      columns.filter(col => col.searchable !== false).map(col => col.key);
  }, [options.searchableColumns, columns]);

  // Filter data based on search and filters
  const filteredData = useMemo(() => {
    let result = data;

    // Apply text search
    if (debouncedSearchTerm) {
      result = result.filter(record => {
        if (options.customSearch) {
          return options.customSearch(debouncedSearchTerm, record, filters);
        }

        // Default search implementation
        return searchableColumns.some(columnKey => {
          const column = columns.find(col => col.key === columnKey);
          if (!column || !column.dataIndex) return false;

          const value = record[column.dataIndex as keyof T];
          if (value === null || value === undefined) return false;

          return String(value).toLowerCase().includes(debouncedSearchTerm.toLowerCase());
        });
      });
    }

    // Apply column filters
    Object.entries(filters).forEach(([filterKey, filterValue]) => {
      if (filterValue !== null && filterValue !== undefined && filterValue !== '') {
        result = result.filter(record => {
          const column = columns.find(col => col.key === filterKey);
          if (!column || !column.dataIndex) return true;

          const recordValue = record[column.dataIndex as keyof T];
          
          // Handle different filter types
          if (Array.isArray(filterValue)) {
            return filterValue.includes(recordValue);
          } else if (typeof filterValue === 'string') {
            return String(recordValue).toLowerCase().includes(filterValue.toLowerCase());
          } else {
            return recordValue === filterValue;
          }
        });
      }
    });

    return result;
  }, [data, debouncedSearchTerm, filters, searchableColumns, columns, options.customSearch]);

  // Update a specific filter
  const updateFilter = useCallback((key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({});
    setSearchTerm('');
    setDebouncedSearchTerm('');
  }, []);

  // Get unique values for a column (for filter dropdown)
  const getUniqueValues = useCallback((columnKey: string) => {
    const column = columns.find(col => col.key === columnKey);
    if (!column || !column.dataIndex) return [];

    const values = data.map(record => record[column.dataIndex as keyof T])
      .filter(value => value !== null && value !== undefined)
      .map(value => String(value));

    return Array.from(new Set(values)).sort();
  }, [data, columns]);

  return {
    searchTerm,
    debouncedSearchTerm,
    filters,
    filteredData,
    updateSearch,
    updateFilter,
    clearFilters,
    getUniqueValues,
    searchableColumns,
  };
};
