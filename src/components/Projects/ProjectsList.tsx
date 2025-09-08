import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useFrappeAuth } from 'frappe-react-sdk';
import { useTheme } from '../../shared/themes';
import { useToast } from '../../contexts/ToastContext';
import { useFrappeGetDocList, useFrappeDeleteDoc } from 'frappe-react-sdk';
import { Layout } from '../Layout';

// Styled Components
const ProjectsListContainer = styled.div`
  min-height: 100vh;
    padding: ${({ theme }) => theme.spacing.sm || '1rem'};
  padding-top: calc(${({ theme }) => theme.spacing.sm || '2rem'} + 10px);
  position: relative;
  overflow-x: hidden;
`;

const PageHeader = styled.div`
  text-align: right;
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

const TableContainer = styled.div`
  background: ${({ theme }) => theme.colors.gradients.card};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const TableHeader = styled.thead`
  background: ${({ theme }) => theme.colors.surface.primary};
`;

const TableHeaderCell = styled.th`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: right;
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface.border};
  white-space: nowrap;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface.border};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.surface.secondary};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: right;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  white-space: nowrap;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  background: ${({ theme, status }) => {
    if (status === 'تم استلام الطلب') return theme.colors.success[500];
    if (status === 'قيد التنفيذ') return theme.colors.warning[500];
    if (status === 'مكتمل') return theme.colors.info[500];
    return theme.colors.surface.secondary;
  }};
  color: white;
  display: inline-block;
`;

const ActionButton = styled.button<{ variant?: 'view' | 'edit' | 'delete' }>`
  background: ${({ theme, variant }) => {
    if (variant === 'view') return theme.colors.info[500];
    if (variant === 'edit') return theme.colors.warning[500];
    if (variant === 'delete') return theme.colors.error[500];
    return theme.colors.primary[500];
  }};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  margin: 0 ${({ theme }) => theme.spacing.xs};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
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

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
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

const ProjectsList: React.FC = () => {
  const { currentUser, isLoading: isAuthLoading, error: authError } = useFrappeAuth();
  const { theme } = useTheme();
  const { showSuccess, showError } = useToast();
  const history = useHistory();
  
  // Debug: Check Frappe authentication directly
      console.log('Frappe Auth State:', { currentUser, isAuthLoading, authError });

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authErrorState, setAuthErrorState] = useState(false); // Renamed to avoid conflict

  // Debug authentication state
  useEffect(() => {
    console.log('ProjectsList: Authentication state:', { 
      currentUser, 
      isAuthLoading, 
      authError
    });
    
    // Only proceed if authentication is working
    if (authError) {
      console.error('Frappe authentication error:', authError);
      setAuthErrorState(true);
      showError('خطأ في المصادقة', 'فشل في المصادقة مع الخادم');
      return;
    }
    
    if (currentUser) {
      console.log('User authenticated:', currentUser);
    }
  }, [currentUser, isAuthLoading, authError, showError]);

  // Use fetch directly instead of SDK hooks to avoid 304 errors
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<any>(null);

  // Fetch projects using direct API call
  const fetchProjects = async () => {
    setIsFetching(true);
    setFetchError(null);
    
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
      console.log('Projects response headers:', Object.fromEntries(res.headers.entries()));
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
             const data = await res.json();
       console.log('Projects data received:', data);
       console.log('Data structure:', {
         hasData: !!data.data,
         isArray: Array.isArray(data.data),
         dataLength: data.data?.length,
         dataType: typeof data.data
       });
       
       if (data.data && Array.isArray(data.data)) {
         console.log('Setting projectsData with:', data.data);
         setProjectsData(data.data);
       } else {
         console.log('No valid data, setting empty array');
         setProjectsData([]);
       }
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      setFetchError(error);
    } finally {
      setIsFetching(false);
    }
  };

  // Fetch projects on component mount
  useEffect(() => {
    // Check localStorage for authentication
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      console.log('User authenticated via localStorage, fetching projects...');
      fetchProjects();
    } else {
      console.log('User not authenticated, redirecting to login...');
      history.push('/login');
    }
  }, []);

  // Use the proper Frappe hook for deleting documents
  const { deleteDoc, loading: isDeleting } = useFrappeDeleteDoc();

  useEffect(() => {
    console.log('ProjectsList: Data update effect triggered');
    console.log('projectsData:', projectsData);
    console.log('fetchError:', fetchError);
    console.log('isFetching:', isFetching);
    
    if (projectsData && projectsData.length > 0) {
      console.log('Setting projects data:', projectsData);
      setProjects(projectsData);
      setIsLoading(false);
    } else if (fetchError) {
      console.error('Error fetching projects:', fetchError);
      
      // Check if it's a permission error
      if (fetchError.message && fetchError.message.includes('PermissionError')) {
        setAuthErrorState(true);
        showError('خطأ في الصلاحيات', 'ليس لديك صلاحية لعرض المشاريع. يرجى التواصل مع المدير.');
      } else {
        showError('حدث خطأ أثناء جلب المشاريع', 'خطأ في الاتصال بالخادم');
      }
      setIsLoading(false);
    } else if (!isFetching) {
      console.log('No data and not fetching, setting loading to false');
      setIsLoading(false);
    }
  }, [projectsData, fetchError, isFetching, showError]);

  const handleViewProject = (projectName: string) => {
    // Navigate to project details page
    history.push(`/project/${projectName}`);
  };

  const handleEditProject = (projectName: string) => {
    // Navigate to edit project page
    history.push(`/edit-project/${projectName}`);
  };

  const handleDeleteProject = async (projectName: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
      try {
        await deleteDoc('work_order_list', projectName);
        
        showSuccess('تم حذف المشروع بنجاح', 'تم حذف المشروع من النظام بنجاح');
        // Refresh the list by updating local state
        setProjects(prev => prev.filter(p => p.name !== projectName));
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

     // Show authentication error message
       if (authErrorState) {
    return (
      <Layout>
        <ProjectsListContainer>
          <PageHeader>
            <PageTitle>خطأ في المصادقة</PageTitle>
            <PageSubtitle>يرجى تسجيل الدخول مرة أخرى</PageSubtitle>
          </PageHeader>
          <TableContainer>
            <EmptyState>
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>حدث خطأ في المصادقة أو الصلاحيات</p>
                
                {/* Debug Information */}
                <div style={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  padding: '1rem', 
                  margin: '1rem 0', 
                  borderRadius: '8px',
                  textAlign: 'left',
                  fontSize: '0.9rem'
                }}>
                  <h4>معلومات التصحيح:</h4>
                  <p><strong>Frappe User:</strong> {currentUser || 'غير محدد'}</p>
                  <p><strong>Auth Loading:</strong> {isAuthLoading ? 'نعم' : 'لا'}</p>
                  <p><strong>Backend URL:</strong> {process.env.REACT_APP_FRAPPE_URL || 'https://qswr.sa'}</p>
                  <p><strong>Error:</strong> {authError?.message || 'لا يوجد خطأ'}</p>
                </div>
                
                <Button onClick={() => window.location.reload()}>
                  إعادة تحميل الصفحة
                </Button>
                <Button onClick={() => history.push('/login')} style={{ marginLeft: '1rem' }}>
                  العودة لتسجيل الدخول
                </Button>
              </div>
            </EmptyState>
          </TableContainer>
        </ProjectsListContainer>
      </Layout>
    );
  }

             if (isLoading || isFetching) {
    return (
      <Layout>
        <ProjectsListContainer>
          <PageHeader>
            <PageTitle>قائمة المشاريع</PageTitle>
            <PageSubtitle>جاري التحميل...</PageSubtitle>
          </PageHeader>
          <TableContainer>
            <EmptyState>
              <LoadingSpinner />
              جاري تحميل المشاريع...
            </EmptyState>
          </TableContainer>
        </ProjectsListContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProjectsListContainer>
        <PageHeader>
          <PageTitle>قائمة المشاريع</PageTitle>
          <PageSubtitle>عرض وإدارة جميع المشاريع</PageSubtitle>
        </PageHeader>

        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableHeaderCell>رقم أمر العمل</TableHeaderCell>
                <TableHeaderCell>الشركة</TableHeaderCell>
                <TableHeaderCell>العميل</TableHeaderCell>
                <TableHeaderCell>نوع العمل</TableHeaderCell>
                <TableHeaderCell>المنطقة</TableHeaderCell>
                <TableHeaderCell>تاريخ الإنشاء</TableHeaderCell>
                <TableHeaderCell>الحالة</TableHeaderCell>
                <TableHeaderCell>آخر تحديث</TableHeaderCell>
                <TableHeaderCell>الإجراءات</TableHeaderCell>
              </tr>
            </TableHeader>
            <TableBody>
              {projects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} style={{ textAlign: 'center' }}>
                    لا توجد مشاريع لعرضها
                  </TableCell>
                </TableRow>
              ) : (
                projects.map((project) => (
                  <TableRow key={project.name}>
                    <TableCell>{project.wo_num1 || '-'}</TableCell>
                    <TableCell>{project.company || '-'}</TableCell>
                    <TableCell>{project.acc_name1 || '-'}</TableCell>
                    <TableCell>{project.job_type1 || '-'}</TableCell>
                    <TableCell>{project.district_name || '-'}</TableCell>
                    <TableCell>{formatDate(project.create_date1)}</TableCell>
                    <TableCell>
                      <StatusBadge status={project.workflow_state || project.work_order_status1}>
                        {project.workflow_state || project.work_order_status1 || '-'}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>{formatDate(project.modified)}</TableCell>
                    <TableCell>
                      <ActionButton variant="view" onClick={() => handleViewProject(project.name)}>
                        عرض
                      </ActionButton>
                      <ActionButton variant="edit" onClick={() => handleEditProject(project.name)}>
                        تعديل
                      </ActionButton>
                      <ActionButton variant="delete" onClick={() => handleDeleteProject(project.name)}>
                        حذف
                      </ActionButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

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

export default ProjectsList;
