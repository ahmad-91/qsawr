import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useFrappeAuth } from 'frappe-react-sdk';
import { useTheme } from '../../shared/themes';
import { useToast } from '../../contexts/ToastContext';
import { useFrappeCreateDoc } from 'frappe-react-sdk';
import { Layout } from '../Layout';

// Styled Components
const CreateProjectContainer = styled.div`
  width: 100%;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: white;
`;

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  background: ${({ theme }) => theme.colors.gradients.accent};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const PageSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  opacity: 0.9;
  margin: 0;
`;

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.gradients.card};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FormSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const Input = styled.input`
  background: ${({ theme }) => theme.colors.surface.primary};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary[500]}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const Select = styled.select`
  background: ${({ theme }) => theme.colors.surface.primary};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary[500]}20;
  }
`;

const TextArea = styled.textarea`
  background: ${({ theme }) => theme.colors.surface.primary};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  min-height: 100px;
  resize: vertical;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary[500]}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  background: ${({ theme, variant }) => 
    variant === 'secondary' 
      ? 'transparent' 
      : theme.colors.gradients.button};
  color: white;
  border: ${({ theme, variant }) => 
    variant === 'secondary' 
      ? `1px solid ${theme.colors.surface.border}` 
      : 'none'};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.primary[500]};
  animation: spin 1s ease-in-out infinite;
  margin-right: ${({ theme }) => theme.spacing.sm};

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

// Project Form Data Interface
interface ProjectFormData {
  wo_num1: string;
  company: string;
  acc_name1: string;
  job_type1: string;
  district_name: string;
  create_date1: string;
  team_la: string;
  indx_date: string;
}

const CreateProject: React.FC = () => {
  const { currentUser } = useFrappeAuth();
  const { theme } = useTheme();
  const { showSuccess, showError } = useToast();
  const { createDoc, loading } = useFrappeCreateDoc();

  const [formData, setFormData] = useState<ProjectFormData>({
    wo_num1: '',
    company: 'مؤسسة قساور',
    acc_name1: '',
    job_type1: '',
    district_name: '',
    create_date1: new Date().toISOString().split('T')[0],
    team_la: '',
    indx_date: new Date().toISOString().split('T')[0],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const projectData = {
        doctype: 'work_order_list',
        ...formData,
        workflow_state: 'تم استلام الطلب',
        work_order_status1: 'تم استلام الطلب',
        work_items_details1: []
      };

      const result = await createDoc('work_order_list', projectData);
      
      if (result) {
        showSuccess('تم إنشاء المشروع بنجاح', 'تم إنشاء المشروع الجديد في النظام بنجاح');
        // Reset form
        setFormData({
          wo_num1: '',
          company: 'مؤسسة قساور',
          acc_name1: '',
          job_type1: '',
          district_name: '',
          create_date1: new Date().toISOString().split('T')[0],
          team_la: '',
          indx_date: new Date().toISOString().split('T')[0],
        });
      }
    } catch (error: any) {
      console.error('Error creating project:', error);
      showError('حدث خطأ أثناء إنشاء المشروع', error.message || 'خطأ غير معروف');
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <Layout>
      <CreateProjectContainer>
        <PageHeader>
          <PageTitle>إنشاء مشروع جديد</PageTitle>
          <PageSubtitle>أدخل تفاصيل المشروع الجديد</PageSubtitle>
        </PageHeader>

        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <FormSection>
              <FormGroup>
                <Label>رقم أمر العمل *</Label>
                <Input
                  type="text"
                  name="wo_num1"
                  value={formData.wo_num1}
                  onChange={handleInputChange}
                  placeholder="أدخل رقم أمر العمل"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>الشركة</Label>
                <Input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="اسم الشركة"
                />
              </FormGroup>
            </FormSection>

            <FormSection>
              <FormGroup>
                <Label>اسم العميل *</Label>
                <Input
                  type="text"
                  name="acc_name1"
                  value={formData.acc_name1}
                  onChange={handleInputChange}
                  placeholder="اسم العميل"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>نوع العمل *</Label>
                <Input
                  type="text"
                  name="job_type1"
                  value={formData.job_type1}
                  onChange={handleInputChange}
                  placeholder="نوع العمل"
                  required
                />
              </FormGroup>
            </FormSection>

            <FormSection>
              <FormGroup>
                <Label>اسم المنطقة</Label>
                <Input
                  type="text"
                  name="district_name"
                  value={formData.district_name}
                  onChange={handleInputChange}
                  placeholder="اسم المنطقة"
                />
              </FormGroup>

              <FormGroup>
                <Label>تاريخ الإنشاء</Label>
                <Input
                  type="date"
                  name="create_date1"
                  value={formData.create_date1}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </FormSection>

            <FormSection>
              <FormGroup>
                <Label>تاريخ الفهرس</Label>
                <Input
                  type="date"
                  name="indx_date"
                  value={formData.indx_date}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label>فريق العمل</Label>
                <TextArea
                  name="team_la"
                  value={formData.team_la}
                  onChange={handleInputChange}
                  placeholder="أدخل تفاصيل فريق العمل"
                />
              </FormGroup>
            </FormSection>

            <ButtonGroup>
              <Button type="button" variant="secondary" onClick={handleBack}>
                رجوع
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <LoadingSpinner />}
                {loading ? 'جاري الإنشاء...' : 'إنشاء المشروع'}
              </Button>
            </ButtonGroup>
          </Form>
        </FormContainer>
      </CreateProjectContainer>
    </Layout>
  );
};

export default CreateProject;
