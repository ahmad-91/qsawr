import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

// Shared Components
import { FormField } from '../shared/FormField';
import { FormSection } from '../shared/FormSection';
import { TextInput, DateInput, FileInput, Select } from '../shared/FormInputs';
import { DynamicTable } from '../shared/DynamicTable';
import { FormActions } from '../shared/FormActions';

// Hooks & Types
import { useProjectForm } from '../../hooks/useProjectForm';
import { ProjectFormData } from '../../types/projectTypes';

// Constants
import { 
  WORK_ORDER_STATUS_OPTIONS, 
  JOB_TYPE_OPTIONS, 
  WORK_ITEMS_COLUMNS,
  FILE_ACCEPT_TYPES 
} from '../../constants/projectConstants';

// Styled Components
const FormContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.surface.card};
  border: 1px solid ${({ theme }) => theme.colors.surface.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  backdrop-filter: blur(8px);
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface.divider};
`;

const FormTitle = styled.h1`
  color: ${({ theme }) => theme.colors.text.heading};
  font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  margin: 0;
`;

const FormSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0.5rem 0 0 0;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

// Main Component
const CreateProjectForm: React.FC = () => {
  const history = useHistory();
  
  const {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleFileUpload,
    addWorkItem,
    updateWorkItem,
    removeWorkItem,
    submitForm,
    resetForm
  } = useProjectForm();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm(() => {
      history.push('/projects');
    });
  };

  // Handle cancel
  const handleCancel = () => {
    history.push('/projects');
  };

  // Prepare form actions
  const formActions = [
    {
      label: 'إلغاء',
      variant: 'secondary' as const,
      onClick: handleCancel
    },
    {
      label: 'إنشاء المشروع',
      variant: 'primary' as const,
      onClick: () => {},
      disabled: isSubmitting,
      loading: isSubmitting
    }
  ];

  // Prepare select options
  const statusOptions = WORK_ORDER_STATUS_OPTIONS.map(status => ({
    value: status,
    label: status
  }));

  const jobTypeOptions = JOB_TYPE_OPTIONS.map(type => ({
    value: type,
    label: type
  }));

  return (
    <FormContainer>
      <FormHeader>
        <FormTitle>إنشاء مشروع جديد</FormTitle>
        <FormSubtitle>أدخل تفاصيل المشروع الجديد</FormSubtitle>
      </FormHeader>

      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <FormSection title="المعلومات الأساسية">
          <FormGrid>
            <FormField label="رقم الطلب" required error={errors.wo_num1}>
              <TextInput
                value={formData.wo_num1}
                onChange={(value) => handleInputChange('wo_num1', value)}
                placeholder="أدخل رقم الطلب"
              />
            </FormField>

            <FormField label="حالة الطلب" required>
              <Select
                value={formData.work_order_status1}
                onChange={(value) => handleInputChange('work_order_status1', value)}
                options={statusOptions}
                placeholder="اختر حالة الطلب"
              />
            </FormField>

            <FormField label="نوع العمل" required>
              <Select
                value={formData.job_type1}
                onChange={(value) => handleInputChange('job_type1', value)}
                options={jobTypeOptions}
                placeholder="اختر نوع العمل"
              />
            </FormField>

            <FormField label="تاريخ الإنشاء" required>
              <DateInput
                value={formData.create_date1}
                onChange={(value) => handleInputChange('create_date1', value)}
              />
            </FormField>

            <FormField label="اسم المشتري" required error={errors.acc_name1}>
              <TextInput
                value={formData.acc_name1}
                onChange={(value) => handleInputChange('acc_name1', value)}
                placeholder="أدخل اسم المشتري"
              />
            </FormField>

            <FormField label="الحي">
              <TextInput
                value={formData.district_name || ''}
                onChange={(value) => handleInputChange('district_name', value)}
                placeholder="أدخل اسم الحي"
              />
            </FormField>
          </FormGrid>
        </FormSection>

        {/* Work Items */}
        <FormSection title="تفاصيل البنود">
          <FormField label="بنود العمل" required error={errors.work_items_details1}>
            <DynamicTable
              columns={WORK_ITEMS_COLUMNS}
              data={formData.work_items_details1}
              onAdd={addWorkItem}
              onUpdate={updateWorkItem}
              onRemove={removeWorkItem}
              addButtonText="إضافة بند جديد"
            />
          </FormField>
        </FormSection>

        {/* License Information */}
        <FormSection title="معلومات الرخصة">
          <FormGrid>
            <FormField label="تاريخ طلب اصدار الرخصة">
              <DateInput
                value={formData.lisence_date || ''}
                onChange={(value) => handleInputChange('lisence_date', value)}
              />
            </FormField>

            <FormField label="تاريخ استلام الرخصة">
              <DateInput
                value={formData.license_date_due || ''}
                onChange={(value) => handleInputChange('license_date_due', value)}
              />
            </FormField>

            <FormField label="تاريخ انتهاء الرخصة">
              <DateInput
                value={formData.exp_lisence_date || ''}
                onChange={(value) => handleInputChange('exp_lisence_date', value)}
              />
            </FormField>

            <FormField label="مرفق رخصة البلدي">
              <FileInput
                onChange={(file) => handleFileUpload('wo_license_file', file)}
                accept={FILE_ACCEPT_TYPES}
              />
            </FormField>
          </FormGrid>
        </FormSection>

        {/* Attachments */}
        <FormSection title="المرفقات">
          <FormField label="مرفق المعاملة">
            <FileInput
              onChange={(file) => handleFileUpload('wo_attach_file', file)}
              accept={FILE_ACCEPT_TYPES}
            />
          </FormField>
        </FormSection>

        {/* Form Actions */}
        <FormActions actions={formActions} />
      </form>
    </FormContainer>
  );
};

export default CreateProjectForm;