import React from 'react';
import styled from 'styled-components';

// Types
interface FormAction {
  label: string;
  variant: 'primary' | 'secondary' | 'danger';
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

interface FormActionsProps {
  actions: FormAction[];
  className?: string;
}

// Styled Components
const ActionsContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.surface.divider};
`;

const ActionButton = styled.button<{ variant: 'primary' | 'secondary' | 'danger' }>`
  padding: 0.75rem 2rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ variant, theme }) => {
    switch (variant) {
      case 'primary':
        return `
          background: ${theme.colors.gradients.button};
          color: ${theme.colors.text.onBrand};
          box-shadow: ${theme.shadows.sm};

          &:hover {
            box-shadow: ${theme.shadows.md};
            transform: translateY(-1px);
          }
        `;
      case 'danger':
        return `
          background: ${theme.colors.error[500]};
          color: white;
          box-shadow: ${theme.shadows.sm};

          &:hover {
            background: ${theme.colors.error[600]};
            transform: translateY(-1px);
          }
        `;
      default:
        return `
          background: transparent;
          color: ${theme.colors.text.primary};
          border: 1px solid ${theme.colors.surface.border};

          &:hover {
            background: ${theme.colors.surface[1]};
            border-color: ${theme.colors.secondary.default};
          }
        `;
    }
  }}

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59,130,246,0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`;

// Component
const FormActions: React.FC<FormActionsProps> = ({ actions, className }) => {
  return (
    <ActionsContainer className={className}>
      {actions.map((action, index) => (
        <ActionButton
          key={index}
          variant={action.variant}
          onClick={action.onClick}
          disabled={action.disabled || action.loading}
        >
          {action.loading ? 'جاري المعالجة...' : action.label}
        </ActionButton>
      ))}
    </ActionsContainer>
  );
};

export default FormActions;
