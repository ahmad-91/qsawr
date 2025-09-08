import styled from 'styled-components';

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop: string | number) => {
    if (typeof prop === 'string') {
      return !['fluid'].includes(prop);
    }
    return true;
  }
})<{ fluid?: boolean }>`
  max-width: ${({ fluid, theme }) => fluid ? '100%' : theme.theme?.breakpoints?.xl || '1280px'};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.theme?.spacing?.md || '1rem'};
  direction: rtl;
  text-align: right;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.currentMode?.color?.background?.primary || '#0f0f23'};
  border-radius: ${({ theme }) => theme.theme?.radii?.lg || '0.75rem'};
  box-shadow: ${({ theme }) => theme.theme?.shadows?.md || '0 4px 10px rgba(0,0,0,.16)'};
  padding: ${({ theme }) => theme.theme?.spacing?.lg || '1.5rem'};
  border: ${({ theme }) => theme.theme?.borderWidth?.hairline || '1px'} solid ${({ theme }) => theme.currentMode?.color?.surface?.border || 'rgba(148, 163, 184, 0.16)'};
  transition: all ${({ theme }) => theme.theme?.motion?.durations?.normal || '240ms'} ${({ theme }) => theme.theme?.motion?.easings?.standard || 'cubic-bezier(.2,.8,.2,1)'};

  &:hover {
    box-shadow: ${({ theme }) => theme.theme?.shadows?.lg || '0 12px 24px rgba(0,0,0,.22)'};
    transform: translateY(-2px);
  }
`;

export const Button = styled.button.withConfig({
  shouldForwardProp: (prop: string | number) => {
    if (typeof prop === 'string') {
      return !['variant', 'size', 'fullWidth'].includes(prop);
    }
    return true;
  }
})<{
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ size, theme }) => {
    switch (size) {
      case 'sm': return `${theme.spacing.sm} ${theme.spacing.md}`;
      case 'lg': return `${theme.spacing.md} ${theme.spacing.xl}`;
      default: return `${theme.spacing.md} ${theme.spacing.lg}`;
    }
  }};
  font-size: ${({ size, theme }) => {
    switch (size) {
      case 'sm': return theme.typography.fontSizes.sm;
      case 'lg': return theme.typography.fontSizes.lg;
      default: return theme.typography.fontSizes.base;
    }
  }};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  direction: rtl;
  text-align: center;

  ${({ variant, theme }) => {
    switch (variant) {
      case 'primary':
        return `
          background: ${theme.colors.primary[500]};
          color: white;
          &:hover {
            background: ${theme.colors.primary[700]};
            transform: translateY(-1px);
          }
        `;
      case 'secondary':
        return `
          background: ${theme.colors.secondary[500]};
          color: white;
          &:hover {
            background: ${theme.colors.secondary[700]};
            transform: translateY(-1px);
          }
        `;
      case 'success':
        return `
          background: ${theme.colors.success[500]};
          color: white;
          &:hover {
            background: ${theme.colors.success[600]};
            transform: translateY(-1px);
          }
        `;
      case 'warning':
        return `
          background: ${theme.colors.warning[500]};
          color: white;
          &:hover {
            background: ${theme.colors.warning[600]};
            transform: translateY(-1px);
          }
        `;
      case 'error':
        return `
          background: ${theme.colors.error[500]};
          color: white;
          &:hover {
            background: ${theme.colors.error[600]};
            transform: translateY(-1px);
          }
        `;
      case 'info':
        return `
          background: ${theme.colors.info[500]};
          color: white;
          &:hover {
            background: ${theme.colors.info[600]};
            transform: translateY(-1px);
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: ${theme.colors.primary[500]};
          border-color: ${theme.colors.primary[500]};
          &:hover {
            background: ${theme.colors.primary[500]};
            color: white;
          }
        `;
      default:
        return `
          background: ${theme.colors.primary[500]};
          color: white;
          &:hover {
            background: ${theme.colors.primary[700]};
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

export const Input = styled.input.withConfig({
  shouldForwardProp: (prop: string | number) => {
    if (typeof prop === 'string') {
      return !['hasError'].includes(prop);
    }
    return true;
  }
})<{ hasError?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ hasError, theme }) => hasError ? theme.colors.error[500] : theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all 0.2s ease;
  direction: rtl;
  text-align: right;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[500]}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  direction: rtl;
  text-align: right;
`;

export const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.error[500]};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: block;
  direction: rtl;
  text-align: right;
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.primary[500]};
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const FlexBox = styled.div.withConfig({
  shouldForwardProp: (prop: string | number) => {
    if (typeof prop === 'string') {
      return !['direction', 'justify', 'align', 'gap'].includes(prop);
    }
    return true;
  }
})<{
  direction?: 'row' | 'column';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  gap?: string;
}>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  justify-content: ${({ justify = 'flex-start' }) => justify};
  align-items: ${({ align = 'stretch' }) => align};
  gap: ${({ gap = '0' }) => gap};
  direction: rtl;
`;

export const Grid = styled.div.withConfig({
  shouldForwardProp: (prop: string | number) => {
    if (typeof prop === 'string') {
      return !['columns', 'gap'].includes(prop);
    }
    return true;
  }
})<{
  columns?: number | string;
  gap?: string;
}>`
  display: grid;
  grid-template-columns: ${({ columns = 1 }) => 
    typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns
  };
  gap: ${({ gap = '0' }) => gap};
  direction: rtl;
`;
