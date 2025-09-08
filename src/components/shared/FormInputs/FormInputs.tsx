import React from 'react';
import styled from 'styled-components';

// Types
interface BaseInputProps {
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

interface TextInputProps extends BaseInputProps {
  type?: 'text' | 'email' | 'password';
}

interface NumberInputProps extends BaseInputProps {
  min?: number;
  max?: number;
  step?: number;
}

interface DateInputProps extends BaseInputProps {
  type?: 'date';
}

interface FileInputProps {
  onChange: (file: File | null) => void;
  accept?: string;
  disabled?: boolean;
  className?: string;
}

interface SelectInputProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

// Styled Components
const BaseInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.surface[0]};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary.default};
    box-shadow: 0 0 0 3px rgba(59,130,246,0.4);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.surface[2]};
    color: ${({ theme }) => theme.colors.text.muted};
    cursor: not-allowed;
  }
`;

const SelectInput = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.surface[0]};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary.default};
    box-shadow: 0 0 0 3px rgba(59,130,246,0.4);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.surface[2]};
    color: ${({ theme }) => theme.colors.text.muted};
    cursor: not-allowed;
  }
`;

// Components
export const TextInput: React.FC<TextInputProps> = ({ 
  value, 
  onChange, 
  type = 'text',
  placeholder,
  disabled,
  className 
}) => (
  <BaseInput
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    disabled={disabled}
    className={className}
  />
);

export const NumberInput: React.FC<NumberInputProps> = ({ 
  value, 
  onChange, 
  min,
  max,
  step,
  placeholder,
  disabled,
  className 
}) => (
  <BaseInput
    type="number"
    value={value}
    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
    min={min}
    max={max}
    step={step}
    placeholder={placeholder}
    disabled={disabled}
    className={className}
  />
);

export const DateInput: React.FC<DateInputProps> = ({ 
  value, 
  onChange, 
  disabled,
  className 
}) => (
  <BaseInput
    type="date"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    disabled={disabled}
    className={className}
  />
);

export const FileInput: React.FC<FileInputProps> = ({ 
  onChange, 
  accept,
  disabled,
  className 
}) => (
  <BaseInput
    type="file"
    onChange={(e) => onChange(e.target.files?.[0] || null)}
    accept={accept}
    disabled={disabled}
    className={className}
  />
);

export const Select: React.FC<SelectInputProps> = ({ 
  value, 
  onChange, 
  options,
  placeholder,
  disabled,
  className 
}) => (
  <SelectInput
    value={value}
    onChange={(e) => onChange(e.target.value)}
    disabled={disabled}
    className={className}
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </SelectInput>
);
