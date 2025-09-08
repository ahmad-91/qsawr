import React from 'react';
import styled from 'styled-components';

// Types
interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

// Styled Components
const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin-bottom: 0.5rem;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const Required = styled.span`
  color: ${({ theme }) => theme.colors.error[500]};
  margin-left: 0.25rem;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error[500]};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  margin-top: 0.5rem;
`;

// Component
const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  required = false, 
  error, 
  children, 
  className 
}) => {
  return (
    <FormGroup className={className}>
      <Label>
        {label}
        {required && <Required>*</Required>}
      </Label>
      {children}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormGroup>
  );
};

export default FormField;
