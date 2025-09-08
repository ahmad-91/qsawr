import React from 'react';
import DataTable from '../DataTable';
import { DataTableColumn, TableAction } from '../types';

// Example data structure
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  created_at: string;
}

// Sample data
const sampleUsers: User[] = [
  {
    id: 1,
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    role: 'مدير',
    status: 'active',
    created_at: '2023-01-15',
  },
  {
    id: 2,
    name: 'فاطمة علي',
    email: 'fatima@example.com',
    role: 'مطور',
    status: 'active',
    created_at: '2023-02-20',
  },
  {
    id: 3,
    name: 'محمد حسن',
    email: 'mohammed@example.com',
    role: 'مصمم',
    status: 'inactive',
    created_at: '2023-03-10',
  },
];

const BasicExample: React.FC = () => {
  // Define columns
  const columns: DataTableColumn<User>[] = [
    {
      key: 'id',
      title: 'الرقم',
      dataIndex: 'id',
      sortable: true,
      width: '80px',
    },
    {
      key: 'name',
      title: 'الاسم',
      dataIndex: 'name',
      sortable: true,
      searchable: true,
      ellipsis: true,
    },
    {
      key: 'email',
      title: 'البريد الإلكتروني',
      dataIndex: 'email',
      searchable: true,
      ellipsis: true,
    },
    {
      key: 'role',
      title: 'الدور',
      dataIndex: 'role',
      sortable: true,
      filterable: true,
    },
    {
      key: 'status',
      title: 'الحالة',
      dataIndex: 'status',
      sortable: true,
      filterable: true,
      render: (value) => (
        <span
          style={{
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold',
            color: 'white',
            background: value === 'active' ? '#22c55e' : '#ef4444',
          }}
        >
          {value === 'active' ? 'نشط' : 'غير نشط'}
        </span>
      ),
    },
    {
      key: 'created_at',
      title: 'تاريخ الإنشاء',
      dataIndex: 'created_at',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString('ar-SA'),
    },
  ];

  // Define actions
  const actions: TableAction<User>[] = [
    {
      key: 'edit',
      label: 'تعديل',
      icon: '✏️',
      variant: 'primary',
      onClick: (record) => {
        console.log('Edit user:', record);
        alert(`تعديل المستخدم: ${record.name}`);
      },
    },
    {
      key: 'delete',
      label: 'حذف',
      icon: '🗑️',
      variant: 'error',
      onClick: (record) => {
        console.log('Delete user:', record);
        if (window.confirm(`هل تريد حذف المستخدم ${record.name}؟`)) {
          alert('تم الحذف بنجاح');
        }
      },
      disabled: (record) => record.role === 'مدير',
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        مثال أساسي على استخدام DataTable
      </h2>
      
      <DataTable<User>
        data={sampleUsers}
        columns={columns}
        rowKey="id"
        search={{
          enabled: true,
          placeholder: 'البحث في المستخدمين...',
          debounceMs: 300,
        }}
        pagination={{
          enabled: true,
          pageSize: 5,
          showSizeChanger: true,
          showTotal: true,
        }}
        sorting={{
          field: 'created_at',
          order: 'desc',
        }}
        selection={{
          enabled: true,
          type: 'checkbox',
        }}
        actions={actions}
        bulkActions={[
          {
            key: 'bulk-delete',
            label: 'حذف المحدد',
            icon: '🗑️',
            variant: 'error',
            onClick: (selectedRows) => {
              alert(`تم تحديد ${selectedRows.length} مستخدم للحذف`);
            },
          },
        ]}
        export={{
          enabled: true,
          formats: ['csv'],
          filename: 'users',
        }}
        emptyState={{
          emptyText: 'لا توجد مستخدمين',
          emptyDescription: 'ابدأ بإضافة مستخدم جديد',
        }}
        size="md"
        bordered={true}
        striped={true}
        hoverable={true}
        onRowClick={(record) => {
          console.log('Row clicked:', record);
        }}
      />
    </div>
  );
};

export default BasicExample;
