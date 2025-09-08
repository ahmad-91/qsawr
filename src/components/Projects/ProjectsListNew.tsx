import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useFrappeAuth } from 'frappe-react-sdk';
import { useTheme } from '../../shared/themes';
import { useToast } from '../../contexts/ToastContext';
import { useFrappeDeleteDoc } from 'frappe-react-sdk';
import { Layout } from '../Layout';
import DataTable from '../DataTable/DataTable';
import { DataTableColumn, TableAction, BulkAction } from '../DataTable/types';
import { useDataTableExport } from '../DataTable/hooks/useDataTableExport';

// Styled Components
const ProjectsListContainer = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.sm || '1rem'};
  padding-top: calc(${({ theme }) => theme.spacing.sm || '2rem'} + 10px);
  position: relative;
  overflow-x: hidden;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: white;
  position: relative;
`;

const CreateButton = styled.button`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(135deg, #3d4a8c 0%, #4a3d6b 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    box-shadow: 0 4px 6px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08);
    transform: translateY(-50%) translateY(-2px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59,130,246,0.4);
  }
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

const StatusBadge = styled.span<{ status: string }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  background: ${({ theme, status }) => {
    if (status === 'تم استلام الطلب') return theme.colors.success[500];
    if (status === 'قيد التنفيذ') return theme.colors.warning[500];
    if (status === 'مكتمل') return theme.colors.info[500];
    if (status === 'معلق') return theme.colors.error[500];
    return theme.colors.neutral[500];
  }};
  color: white;
  display: inline-block;
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
      : theme.colors.gradients.button
  };
  color: white;
  border: ${({ theme, variant }) => 
    variant === 'secondary' 
      ? `1px solid ${theme.colors.surface.border}` 
      : 'none'
  };
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
`;

// Project Interface
interface Project {
  name: string;
  wo_num1: string;
  company: string;
  acc_name1: string;
  job_type1: string;
  district_name: string;
  create_date1: string;
  workflow_state: string;
  work_order_status1: string;
  modified: string;
}

const ProjectsListNew: React.FC = () => {
  const { currentUser, isLoading: isAuthLoading, error: authError } = useFrappeAuth();
  const { theme } = useTheme();
  const { showSuccess, showError } = useToast();
  const history = useHistory();
  const { exportToCSV, printTable } = useDataTableExport();
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authErrorState, setAuthErrorState] = useState(false);

  // Use the proper Frappe hook for deleting documents
  const { deleteDoc, loading: isDeleting } = useFrappeDeleteDoc();

  // Fetch projects using direct API call
  const fetchProjects = async () => {
    setIsLoading(true);
    
    try {
      console.log('Fetching projects from Frappe...');
      
      const res = await fetch('https://qswr.sa/api/resource/work_order_list?fields=["name","wo_num1","company","acc_name1","job_type1","district_name","create_date1","workflow_state","work_order_status1","modified"]&limit=100&as_dict=true', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Projects response status:', res.status);
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      const data = await res.json();
      console.log('Projects data received:', data);
      
      if (data.data && Array.isArray(data.data)) {
        setProjects(data.data);
      } else {
        setProjects([]);
      }
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      showError('حدث خطأ أثناء جلب المشاريع', error.message || 'خطأ في الاتصال بالخادم');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch projects on component mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      fetchProjects();
    } else {
      history.push('/login');
    }
  }, []);

  // Handle actions
  const handleViewProject = (projectName: string) => {
    history.push(`/project/${projectName}`);
  };

  const handleEditProject = (projectName: string) => {
    history.push(`/edit-project/${projectName}`);
  };

  const handleDeleteProject = async (project: Project) => {
    if (window.confirm(`هل أنت متأكد من حذف المشروع "${project.wo_num1}"؟`)) {
      try {
        await deleteDoc('work_order_list', project.name);
        showSuccess('تم حذف المشروع بنجاح', 'تم حذف المشروع من النظام بنجاح');
        // Refresh the list
        fetchProjects();
      } catch (error: any) {
        console.error('Error deleting project:', error);
        showError('حدث خطأ أثناء حذف المشروع', error.message || 'خطأ غير معروف');
      }
    }
  };

  const handleCreateNew = () => {
    history.push('/create-project');
  };

  const handleBack = () => {
    history.goBack();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('ar-SA');
    } catch {
      return dateString;
    }
  };

  // Define table columns
  const columns: DataTableColumn<Project>[] = [
    {
      key: 'wo_num1',
      title: 'رقم أمر العمل',
      dataIndex: 'wo_num1',
      sortable: true,
      searchable: true,
      width: '150px',
      render: (value) => value || '-',
    },
    {
      key: 'company',
      title: 'الشركة',
      dataIndex: 'company',
      sortable: true,
      searchable: true,
      width: '200px',
      render: (value) => value || '-',
    },
    {
      key: 'acc_name1',
      title: 'العميل',
      dataIndex: 'acc_name1',
      sortable: true,
      searchable: true,
      width: '200px',
      render: (value) => value || '-',
    },
    {
      key: 'job_type1',
      title: 'نوع العمل',
      dataIndex: 'job_type1',
      sortable: true,
      searchable: true,
      width: '150px',
      render: (value) => value || '-',
    },
    {
      key: 'district_name',
      title: 'المنطقة',
      dataIndex: 'district_name',
      sortable: true,
      searchable: true,
      width: '150px',
      render: (value) => value || '-',
    },
    {
      key: 'create_date1',
      title: 'تاريخ الإنشاء',
      dataIndex: 'create_date1',
      sortable: true,
      width: '130px',
      render: (value) => formatDate(value),
    },
    {
      key: 'workflow_state',
      title: 'الحالة',
      dataIndex: 'workflow_state',
      sortable: true,
      filterable: true,
      width: '150px',
      render: (value, record) => (
        <StatusBadge status={value || record.work_order_status1}>
          {value || record.work_order_status1 || '-'}
        </StatusBadge>
      ),
    },
    {
      key: 'modified',
      title: 'آخر تحديث',
      dataIndex: 'modified',
      sortable: true,
      width: '130px',
      render: (value) => formatDate(value),
    },
  ];

  // Define table actions
  const actions: TableAction<Project>[] = [
    {
      key: 'view',
      label: 'عرض',
      icon: '👁',
      variant: 'info',
      onClick: (record) => handleViewProject(record.name),
    },
    {
      key: 'edit',
      label: 'تعديل',
      icon: '✏️',
      variant: 'warning',
      onClick: (record) => handleEditProject(record.name),
    },
    {
      key: 'delete',
      label: 'حذف',
      icon: '🗑',
      variant: 'error',
      onClick: (record) => handleDeleteProject(record),
    },
  ];

  // Define bulk actions
  const bulkActions: BulkAction<Project>[] = [
    {
      key: 'bulk-delete',
      label: 'حذف المحدد',
      icon: '🗑',
      variant: 'error',
      onClick: async (selectedRows) => {
        if (window.confirm(`هل أنت متأكد من حذف ${selectedRows.length} مشروع؟`)) {
          try {
            for (const project of selectedRows) {
              await deleteDoc('work_order_list', project.name);
            }
            showSuccess('تم حذف المشاريع بنجاح', `تم حذف ${selectedRows.length} مشروع من النظام`);
            fetchProjects();
          } catch (error: any) {
            showError('حدث خطأ أثناء حذف المشاريع', error.message);
          }
        }
      },
    },
    {
      key: 'bulk-export',
      label: 'تصدير المحدد',
      icon: '📊',
      variant: 'primary',
      onClick: (selectedRows) => {
        exportToCSV(selectedRows, columns, { filename: 'selected_projects' });
      },
    },
  ];

  // Handle custom export
  const handleCustomExport = (data: Project[], format: string) => {
    switch (format) {
      case 'csv':
        exportToCSV(data, columns, { filename: 'projects_export' });
        break;
      case 'print':
        printTable(data, columns, 'قائمة المشاريع');
        break;
      default:
        console.log('Export format not supported:', format);
    }
  };

  if (authErrorState) {
    return (
      <Layout>
        <ProjectsListContainer>
          <PageHeader>
            <PageTitle>خطأ في المصادقة</PageTitle>
            <PageSubtitle>يرجى تسجيل الدخول مرة أخرى</PageSubtitle>
          </PageHeader>
          <ButtonGroup>
            <Button onClick={() => window.location.reload()}>
              إعادة تحميل الصفحة
            </Button>
            <Button onClick={() => history.push('/login')} variant="secondary">
              العودة لتسجيل الدخول
            </Button>
          </ButtonGroup>
        </ProjectsListContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProjectsListContainer>
        <PageHeader>
          <CreateButton onClick={() => history.push('/projects/create-new')}>
            ➕ إنشاء مشروع جديد
          </CreateButton>
          <PageTitle>قائمة المشاريع</PageTitle>
          <PageSubtitle>عرض وإدارة جميع المشاريع بطريقة متقدمة</PageSubtitle>
        </PageHeader>

        <DataTable<Project>
          data={projects}
          columns={columns}
          rowKey="name"
          loading={{
            loading: isLoading,
            skeleton: true,
            loadingText: 'جاري تحميل المشاريع...',
          }}
          search={{
            enabled: true,
            placeholder: 'البحث في المشاريع (رقم أمر العمل، الشركة، العميل...)...',
            debounceMs: 300,
          }}
          pagination={{
            enabled: true,
            pageSize: 10,
            pageSizeOptions: [10, 25, 50, 100],
            showSizeChanger: true,
            showTotal: true,
            position: 'bottom',
          }}
          sorting={{
            field: 'modified',
            order: 'desc',
          }}
          selection={{
            enabled: true,
            type: 'checkbox',
          }}
          actions={actions}
          bulkActions={bulkActions}
          export={{
            enabled: true,
            formats: ['csv'],
            filename: 'projects',
            customExport: handleCustomExport,
          }}
          emptyState={{
            emptyText: 'لا توجد مشاريع لعرضها',
            emptyDescription: 'ابدأ بإنشاء مشروع جديد',
            emptyAction: (
              <Button onClick={handleCreateNew} style={{ marginTop: '1rem' }}>
                إنشاء مشروع جديد
              </Button>
            ),
          }}
          size="md"
          bordered={true}
          striped={true}
          hoverable={true}
          sticky={true}
          onRowClick={(record) => console.log('Row clicked:', record)}
        />

        <ButtonGroup>
          <Button variant="secondary" onClick={handleBack}>
            رجوع
          </Button>
          <Button onClick={handleCreateNew}>
            إنشاء مشروع جديد
          </Button>
        </ButtonGroup>
      </ProjectsListContainer>
    </Layout>
  );
};

export default ProjectsListNew;
