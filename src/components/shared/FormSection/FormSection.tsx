import React from 'react';
import styled from 'styled-components';

// Types
interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

// Styled Components
const Section = styled.div`
  background: ${({ theme }) => theme.colors.surface[1]};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.heading};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface.divider};
`;

// Component
const FormSection: React.FC<FormSectionProps> = ({ title, children, className }) => {
  return (
    <Section className={className}>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </Section>
  );
};

export default FormSection;
