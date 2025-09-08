import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

// Error boundary styles
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing['3xl']};
  background: ${({ theme }) => theme.colors.surface.primary};
  border: 1px solid ${({ theme }) => theme.colors.error[300]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  min-height: 300px;
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.error[500]};
`;

const ErrorTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  color: ${({ theme }) => theme.colors.error[600]};
`;

const ErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  max-width: 600px;
  line-height: 1.6;
`;

const ErrorDetails = styled.details`
  margin-top: ${({ theme }) => theme.spacing.lg};
  max-width: 100%;
  
  summary {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.error[600]};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    
    &:hover {
      color: ${({ theme }) => theme.colors.error[700]};
    }
  }
`;

const ErrorCode = styled.pre`
  background: ${({ theme }) => theme.colors.surface.secondary};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: left;
  overflow-x: auto;
  max-width: 600px;
  white-space: pre-wrap;
  word-break: break-word;
`;

const RetryButton = styled.button`
  background: ${({ theme }) => theme.colors.primary[500]};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  margin-top: ${({ theme }) => theme.spacing.lg};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary[600]};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class DataTableErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('DataTable Error:', error);
    console.error('Error Info:', errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Call optional error handler
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <ErrorContainer>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorTitle>حدث خطأ في جدول البيانات</ErrorTitle>
          <ErrorMessage>
            عذراً، حدث خطأ غير متوقع أثناء عرض البيانات. 
            يرجى المحاولة مرة أخرى أو إعادة تحميل الصفحة.
          </ErrorMessage>
          
          <RetryButton onClick={this.handleRetry}>
            إعادة المحاولة
          </RetryButton>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <ErrorDetails>
              <summary>تفاصيل الخطأ (وضع التطوير)</summary>
              <ErrorCode>
                <strong>الخطأ:</strong> {this.state.error.message}
                {this.state.errorInfo && (
                  <>
                    <br /><br />
                    <strong>مكدس الاستدعاءات:</strong>
                    <br />
                    {this.state.errorInfo.componentStack}
                  </>
                )}
              </ErrorCode>
            </ErrorDetails>
          )}
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easier usage
export const withErrorBoundary = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) => {
  const WithErrorBoundaryComponent = (props: P) => (
    <DataTableErrorBoundary {...errorBoundaryProps}>
      <WrappedComponent {...props} />
    </DataTableErrorBoundary>
  );

  WithErrorBoundaryComponent.displayName = 
    `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithErrorBoundaryComponent;
};
