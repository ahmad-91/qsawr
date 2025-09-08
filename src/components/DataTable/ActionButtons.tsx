import React from 'react';
import styled, { css, keyframes } from 'styled-components';

// Animation keyframes
const ripple = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(0, 123, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0);
  }
`;

// Icon wrapper for consistent sizing
const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  font-size: 14px;
`;

// Base button with IBM Carbon and MUI X inspired design
const BaseActionButton = styled.button<{
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  isIconOnly?: boolean;
  isLoading?: boolean;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme, isIconOnly }) => isIconOnly ? '0' : theme.spacing.xs};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.2, 0, 0.38, 0.9);
  overflow: hidden;
  white-space: nowrap;
  user-select: none;
  outline: none;
  
  /* Ripple effect container */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }
  
  &:active::before {
    width: 300px;
    height: 300px;
  }

  /* Size variants */
  ${({ size, theme, isIconOnly }) => {
    switch (size) {
      case 'sm':
        return css`
          height: 32px;
          padding: ${isIconOnly ? '0' : '0 12px'};
          ${isIconOnly && 'width: 32px;'}
          font-size: ${theme.typography.fontSizes.sm};
          
          ${IconWrapper} {
            width: 14px;
            height: 14px;
            font-size: 12px;
          }
        `;
      case 'lg':
        return css`
          height: 48px;
          padding: ${isIconOnly ? '0' : '0 24px'};
          ${isIconOnly && 'width: 48px;'}
          font-size: ${theme.typography.fontSizes.lg};
          
          ${IconWrapper} {
            width: 20px;
            height: 20px;
            font-size: 16px;
          }
        `;
      default: // md
        return css`
          height: 40px;
          padding: ${isIconOnly ? '0' : '0 16px'};
          ${isIconOnly && 'width: 40px;'}
          font-size: ${theme.typography.fontSizes.base};
        `;
    }
  }}

  /* Variant styles */
  ${({ variant, theme }) => {
    switch (variant) {
      case 'primary':
        return css`
          background: linear-gradient(135deg, ${theme.colors.primary[500]} 0%, ${theme.colors.primary[600]} 100%);
          color: white;
          box-shadow: 0 2px 4px ${theme.colors.primary[500]}20;
          
          &:hover {
            background: linear-gradient(135deg, ${theme.colors.primary[600]} 0%, ${theme.colors.primary[700]} 100%);
            box-shadow: 0 4px 8px ${theme.colors.primary[500]}30;
            transform: translateY(-1px);
          }
          
          &:active {
            transform: translateY(0);
            box-shadow: 0 2px 4px ${theme.colors.primary[500]}20;
          }
          
          &:focus-visible {
            box-shadow: 0 0 0 3px ${theme.colors.primary[500]}40;
          }
        `;
      case 'secondary':
        return css`
          background: ${theme.colors.surface.secondary};
          color: ${theme.colors.text.primary};
          border: 1px solid ${theme.colors.surface.border};
          
          &:hover {
            background: ${theme.colors.surface.elevated};
            border-color: ${theme.colors.primary[300]};
            transform: translateY(-1px);
            box-shadow: 0 2px 8px ${theme.colors.neutral[900]}10;
          }
          
          &:focus-visible {
            border-color: ${theme.colors.primary[500]};
            box-shadow: 0 0 0 3px ${theme.colors.primary[500]}20;
          }
        `;
      case 'ghost':
        return css`
          background: transparent;
          color: ${theme.colors.text.secondary};
          border: 1px solid transparent;
          
          &:hover {
            background: ${theme.colors.surface.secondary};
            color: ${theme.colors.text.primary};
            border-color: ${theme.colors.surface.border};
          }
          
          &:focus-visible {
            background: ${theme.colors.surface.secondary};
            border-color: ${theme.colors.primary[500]};
            box-shadow: 0 0 0 3px ${theme.colors.primary[500]}20;
          }
        `;
      case 'danger':
        return css`
          background: linear-gradient(135deg, ${theme.colors.error[500]} 0%, ${theme.colors.error[600]} 100%);
          color: white;
          box-shadow: 0 2px 4px ${theme.colors.error[500]}20;
          
          &:hover {
            background: linear-gradient(135deg, ${theme.colors.error[600]} 0%, ${theme.colors.error[700]} 100%);
            box-shadow: 0 4px 8px ${theme.colors.error[500]}30;
            transform: translateY(-1px);
          }
          
          &:focus-visible {
            box-shadow: 0 0 0 3px ${theme.colors.error[500]}40;
          }
        `;
      case 'tertiary':
        return css`
          background: ${theme.colors.info[500]};
          color: white;
          box-shadow: 0 2px 4px ${theme.colors.info[500]}20;
          
          &:hover {
            background: ${theme.colors.info[600]};
            box-shadow: 0 4px 8px ${theme.colors.info[500]}30;
            transform: translateY(-1px);
          }
          
          &:focus-visible {
            box-shadow: 0 0 0 3px ${theme.colors.info[500]}40;
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

  /* Disabled state */
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
    pointer-events: none;
  }

  /* Loading state */
  ${({ isLoading }) => isLoading && css`
    pointer-events: none;
    
    &::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `}
`;

// Action button group container
const ActionButtonGroup = styled.div<{ align?: 'left' | 'center' | 'right' }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  justify-content: ${({ align }) => {
    switch (align) {
      case 'left': return 'flex-start';
      case 'center': return 'center';
      case 'right': return 'flex-end';
      default: return 'flex-start';
    }
  }};
`;

// Tooltip wrapper
const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
  
  &:hover .tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateY(-5px);
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(5px);
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.neutral[900]};
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  z-index: 1000;
  pointer-events: none;
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: ${({ theme }) => theme.colors.neutral[900]};
  }
`;

// Component interfaces
interface ActionButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children?: React.ReactNode;
  tooltip?: string;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

interface ActionButtonGroupProps {
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
  className?: string;
}

// Action Button Component
export const ActionButton: React.FC<ActionButtonProps> = ({
  variant = 'secondary',
  size = 'md',
  icon,
  children,
  tooltip,
  isLoading = false,
  disabled = false,
  onClick,
  className,
  ...props
}) => {
  const isIconOnly = !!icon && !children;
  
  const button = (
    <BaseActionButton
      variant={variant}
      size={size}
      isIconOnly={isIconOnly}
      isLoading={isLoading}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={className}
      {...props}
    >
      {!isLoading && icon && <IconWrapper>{icon}</IconWrapper>}
      {!isLoading && children}
    </BaseActionButton>
  );

  if (tooltip) {
    return (
      <TooltipWrapper>
        {button}
        <Tooltip className="tooltip">{tooltip}</Tooltip>
      </TooltipWrapper>
    );
  }

  return button;
};

// Action Button Group Component
export const DataTableActionGroup: React.FC<ActionButtonGroupProps> = ({
  align = 'left',
  children,
  className,
}) => {
  return (
    <ActionButtonGroup align={align} className={className}>
      {children}
    </ActionButtonGroup>
  );
};

// Predefined action buttons following IBM Carbon patterns
export const ViewButton: React.FC<Omit<ActionButtonProps, 'variant' | 'icon'>> = (props) => (
  <ActionButton
    variant="tertiary"
    icon="👁"
    tooltip="عرض التفاصيل"
    {...props}
  />
);

export const EditButton: React.FC<Omit<ActionButtonProps, 'variant' | 'icon'>> = (props) => (
  <ActionButton
    variant="secondary"
    icon="✏️"
    tooltip="تعديل"
    {...props}
  />
);

export const DeleteButton: React.FC<Omit<ActionButtonProps, 'variant' | 'icon'>> = (props) => (
  <ActionButton
    variant="danger"
    icon="🗑"
    tooltip="حذف"
    {...props}
  />
);

export const DownloadButton: React.FC<Omit<ActionButtonProps, 'variant' | 'icon'>> = (props) => (
  <ActionButton
    variant="secondary"
    icon="⬇️"
    tooltip="تحميل"
    {...props}
  />
);

export const ShareButton: React.FC<Omit<ActionButtonProps, 'variant' | 'icon'>> = (props) => (
  <ActionButton
    variant="ghost"
    icon="🔗"
    tooltip="مشاركة"
    {...props}
  />
);

export const MoreButton: React.FC<Omit<ActionButtonProps, 'variant' | 'icon'>> = (props) => (
  <ActionButton
    variant="ghost"
    icon="⋯"
    tooltip="المزيد"
    {...props}
  />
);
