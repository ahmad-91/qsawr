import React from 'react';
import styled, { keyframes } from 'styled-components';

// Shimmer animation
const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

// Base shimmer element
const ShimmerBase = styled.div`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.surface.primary} 0%,
    ${({ theme }) => theme.colors.surface.secondary} 20%,
    ${({ theme }) => theme.colors.surface.elevated} 60%,
    ${({ theme }) => theme.colors.surface.primary} 100%
  );
  background-size: 800px 104px;
  animation: ${shimmer} 1.6s linear infinite;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

// Shimmer row container
const ShimmerRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface.border};
`;

// Shimmer cell
const ShimmerCell = styled.td<{ width?: string; height?: string }>`
  padding: ${({ theme }) => theme.spacing.md};
  vertical-align: middle;
`;

// Shimmer content
const ShimmerContent = styled(ShimmerBase)<{ 
  width?: string; 
  height?: string;
  variant?: 'text' | 'circle' | 'rectangle';
}>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height, variant }) => {
    if (height) return height;
    switch (variant) {
      case 'circle': return '32px';
      case 'rectangle': return '20px';
      default: return '16px'; // text
    }
  }};
  border-radius: ${({ theme, variant }) => {
    switch (variant) {
      case 'circle': return '50%';
      case 'rectangle': return theme.borderRadius.md;
      default: return theme.borderRadius.sm;
    }
  }};
  display: inline-block;
`;

// Shimmer table row component
interface ShimmerTableRowProps {
  columns: number;
  hasActions?: boolean;
  hasSelection?: boolean;
}

export const ShimmerTableRow: React.FC<ShimmerTableRowProps> = ({
  columns,
  hasActions = false,
  hasSelection = false,
}) => {
  const totalColumns = columns + (hasActions ? 1 : 0) + (hasSelection ? 1 : 0);
  
  return (
    <ShimmerRow>
      {hasSelection && (
        <ShimmerCell width="50px">
          <ShimmerContent variant="circle" width="16px" height="16px" />
        </ShimmerCell>
      )}
      
      {Array.from({ length: columns }).map((_, index) => (
        <ShimmerCell key={index}>
          <ShimmerContent 
            width={`${Math.random() * 40 + 60}%`} // Random width between 60-100%
            variant="text"
          />
        </ShimmerCell>
      ))}
      
      {hasActions && (
        <ShimmerCell width="120px">
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <ShimmerContent variant="circle" width="32px" height="32px" />
            <ShimmerContent variant="circle" width="32px" height="32px" />
            <ShimmerContent variant="circle" width="32px" height="32px" />
          </div>
        </ShimmerCell>
      )}
    </ShimmerRow>
  );
};

// Shimmer table component
interface ShimmerTableProps {
  rows?: number;
  columns: number;
  hasActions?: boolean;
  hasSelection?: boolean;
}

export const ShimmerTable: React.FC<ShimmerTableProps> = ({
  rows = 5,
  columns,
  hasActions = false,
  hasSelection = false,
}) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <ShimmerTableRow
          key={index}
          columns={columns}
          hasActions={hasActions}
          hasSelection={hasSelection}
        />
      ))}
    </>
  );
};

// Header shimmer
const ShimmerHeaderCell = styled.th<{ width?: string }>`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: right;
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface.border};
  width: ${({ width }) => width || 'auto'};
`;

export const ShimmerTableHeader: React.FC<ShimmerTableProps> = ({
  columns,
  hasActions = false,
  hasSelection = false,
}) => {
  return (
    <tr>
      {hasSelection && (
        <ShimmerHeaderCell width="50px">
          <ShimmerContent variant="circle" width="16px" height="16px" />
        </ShimmerHeaderCell>
      )}
      
      {Array.from({ length: columns }).map((_, index) => (
        <ShimmerHeaderCell key={index}>
          <ShimmerContent 
            width={`${Math.random() * 30 + 50}%`}
            height="20px"
            variant="rectangle"
          />
        </ShimmerHeaderCell>
      ))}
      
      {hasActions && (
        <ShimmerHeaderCell width="120px">
          <ShimmerContent 
            width="60px"
            height="20px"
            variant="rectangle"
          />
        </ShimmerHeaderCell>
      )}
    </tr>
  );
};

// Loading card shimmer
const ShimmerCard = styled.div`
  background: ${({ theme }) => theme.colors.surface.primary};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ShimmerCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.md};
`;

const ShimmerCardBody = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const ShimmerDataTableCard: React.FC = () => {
  return (
    <ShimmerCard>
      {/* Header */}
      <ShimmerCardHeader>
        <div style={{ flex: 1 }}>
          <ShimmerContent width="300px" height="40px" variant="rectangle" />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <ShimmerContent width="80px" height="32px" variant="rectangle" />
          <ShimmerContent width="80px" height="32px" variant="rectangle" />
          <ShimmerContent width="80px" height="32px" variant="rectangle" />
        </div>
      </ShimmerCardHeader>
      
      {/* Table */}
      <ShimmerCardBody>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <ShimmerTableHeader 
              columns={6} 
              hasActions={true} 
              hasSelection={true} 
            />
          </thead>
          <tbody>
            <ShimmerTable 
              rows={8} 
              columns={6} 
              hasActions={true} 
              hasSelection={true} 
            />
          </tbody>
        </table>
      </ShimmerCardBody>
      
      {/* Footer */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingTop: '16px',
        borderTop: `1px solid var(--border-color)`
      }}>
        <ShimmerContent width="200px" height="16px" variant="text" />
        <div style={{ display: 'flex', gap: '8px' }}>
          <ShimmerContent width="40px" height="32px" variant="rectangle" />
          <ShimmerContent width="40px" height="32px" variant="rectangle" />
          <ShimmerContent width="40px" height="32px" variant="rectangle" />
          <ShimmerContent width="40px" height="32px" variant="rectangle" />
        </div>
      </div>
    </ShimmerCard>
  );
};
