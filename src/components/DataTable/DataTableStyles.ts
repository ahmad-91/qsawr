import styled, { css } from 'styled-components';

// Main Container
export const DataTableContainer = styled.div<{ size?: 'sm' | 'md' | 'lg' }>`
  width: 100%;
  background: ${({ theme }) => theme.colors.gradients.card};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  
  ${({ size }) => {
    switch (size) {
      case 'sm':
        return css`
          padding: ${({ theme }) => theme.spacing.md};
        `;
      case 'lg':
        return css`
          padding: ${({ theme }) => theme.spacing['2xl']};
        `;
      default:
        return css`
          padding: ${({ theme }) => theme.spacing.xl};
        `;
    }
  }}
`;

// Header Section
export const DataTableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex: 1;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

// Search Component
export const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md} 2.5rem;
  background: ${({ theme }) => theme.colors.surface.primary};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  transition: all ${({ theme }) => theme.transitions.normal};
  direction: rtl;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary[500]};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.secondary[500]}20;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  pointer-events: none;
`;

// Actions Bar
export const ActionsBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const ActionButton = styled.button<{ 
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
}>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ size, theme }) => {
    switch (size) {
      case 'sm': return `${theme.spacing.xs} ${theme.spacing.sm}`;
      case 'lg': return `${theme.spacing.md} ${theme.spacing.xl}`;
      default: return `${theme.spacing.sm} ${theme.spacing.md}`;
    }
  }};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  font-size: ${({ size, theme }) => {
    switch (size) {
      case 'sm': return theme.typography.fontSizes.sm;
      case 'lg': return theme.typography.fontSizes.lg;
      default: return theme.typography.fontSizes.base;
    }
  }};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  
  ${({ variant, theme }) => {
    switch (variant) {
      case 'primary':
        return css`
          background: ${theme.colors.primary[500]};
          color: white;
          &:hover {
            background: ${theme.colors.primary[600]};
            transform: translateY(-1px);
          }
        `;
      case 'secondary':
        return css`
          background: ${theme.colors.secondary[500]};
          color: white;
          &:hover {
            background: ${theme.colors.secondary[600]};
            transform: translateY(-1px);
          }
        `;
      case 'success':
        return css`
          background: ${theme.colors.success[500]};
          color: white;
          &:hover {
            background: ${theme.colors.success[600]};
            transform: translateY(-1px);
          }
        `;
      case 'warning':
        return css`
          background: ${theme.colors.warning[500]};
          color: white;
          &:hover {
            background: ${theme.colors.warning[600]};
            transform: translateY(-1px);
          }
        `;
      case 'error':
        return css`
          background: ${theme.colors.error[500]};
          color: white;
          &:hover {
            background: ${theme.colors.error[600]};
            transform: translateY(-1px);
          }
        `;
      case 'info':
        return css`
          background: ${theme.colors.info[500]};
          color: white;
          &:hover {
            background: ${theme.colors.info[600]};
            transform: translateY(-1px);
          }
        `;
      default:
        return css`
          background: ${theme.colors.surface.secondary};
          color: ${theme.colors.text.primary};
          border: 1px solid ${theme.colors.surface.border};
          &:hover {
            background: ${theme.colors.surface.elevated};
            transform: translateY(-1px);
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// Table Wrapper
export const TableWrapper = styled.div<{ maxHeight?: string }>`
  overflow: auto;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  max-height: ${({ maxHeight }) => maxHeight || 'none'};
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface.primary};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.surface.border};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    
    &:hover {
      background: ${({ theme }) => theme.colors.surface.elevated};
    }
  }
`;

// Table
export const Table = styled.table<{ 
  bordered?: boolean; 
  striped?: boolean; 
  size?: 'sm' | 'md' | 'lg';
}>`
  width: 100%;
  border-collapse: collapse;
  color: ${({ theme }) => theme.colors.text.primary};
  
  ${({ bordered, theme }) => bordered && css`
    border: 1px solid ${theme.colors.surface.border};
  `}
`;

// Table Header
export const TableHeader = styled.thead<{ sticky?: boolean }>`
  background: ${({ theme }) => theme.colors.surface.primary};
  
  ${({ sticky }) => sticky && css`
    position: sticky;
    top: 0;
    z-index: 10;
  `}
`;

export const TableHeaderCell = styled.th<{ 
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  width?: string | number;
  minWidth?: string | number;
}>`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: ${({ align }) => align || 'right'};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface.border};
  white-space: nowrap;
  position: relative;
  
  ${({ width }) => width && css`width: ${typeof width === 'number' ? `${width}px` : width};`}
  ${({ minWidth }) => minWidth && css`min-width: ${typeof minWidth === 'number' ? `${minWidth}px` : minWidth};`}
  
  ${({ sortable }) => sortable && css`
    cursor: pointer;
    user-select: none;
    
    &:hover {
      background: ${({ theme }) => theme.colors.surface.secondary};
    }
    
    &::after {
      content: '';
      position: absolute;
      left: 8px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border: 4px solid transparent;
      border-bottom-color: ${({ theme }) => theme.colors.text.tertiary};
      opacity: 0.3;
    }
    
    &.sort-asc::after {
      border-bottom-color: ${({ theme }) => theme.colors.secondary[500]};
      opacity: 1;
    }
    
    &.sort-desc::after {
      border-top-color: ${({ theme }) => theme.colors.secondary[500]};
      border-bottom-color: transparent;
      opacity: 1;
    }
  `}
`;

// Table Body
export const TableBody = styled.tbody``;

export const TableRow = styled.tr<{ 
  hoverable?: boolean; 
  striped?: boolean; 
  index?: number;
  selected?: boolean;
}>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface.border};
  transition: all ${({ theme }) => theme.transitions.normal};
  
  ${({ striped, index, theme }) => striped && index && index % 2 === 0 && css`
    background: ${theme.colors.surface.primary};
  `}
  
  ${({ selected, theme }) => selected && css`
    background: ${theme.colors.secondary[500]}20;
    border-color: ${theme.colors.secondary[500]};
  `}
  
  ${({ hoverable, theme }) => hoverable && css`
    &:hover {
      background: ${theme.colors.surface.secondary};
      transform: translateX(2px);
    }
  `}
  
  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td<{ 
  align?: 'left' | 'center' | 'right';
  ellipsis?: boolean;
}>`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: ${({ align }) => align || 'right'};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  
  ${({ ellipsis }) => ellipsis && css`
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
`;

// Pagination
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.surface.border};
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const PaginationInfo = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

export const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const PaginationButton = styled.button<{ active?: boolean }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme, active }) => 
    active ? theme.colors.secondary[500] : theme.colors.surface.primary};
  color: ${({ theme, active }) => 
    active ? 'white' : theme.colors.text.primary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover:not(:disabled) {
    background: ${({ theme, active }) => 
      active ? theme.colors.secondary[600] : theme.colors.surface.secondary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Loading and Empty States
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing['2xl']};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing['3xl']};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
`;

export const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  opacity: 0.5;
`;

export const EmptyText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const EmptyDescription = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// Selection Checkbox
export const SelectionCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;
