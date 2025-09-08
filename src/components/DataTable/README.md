# DataTable Component

مكون جدول متقدم وقابل لإعادة الاستخدام مصمم خصيصاً للمشاريع واسعة النطاق مع دعم كامل للغة العربية.

## المميزات

### ✨ المميزات الأساسية
- 🔍 **البحث المتقدم** - بحث فوري مع debouncing
- 📊 **الترتيب** - ترتيب متعدد الأعمدة 
- 📄 **التصفح** - تصفح متقدم مع خيارات متعددة
- ✅ **التحديد** - تحديد صفوف مفردة أو متعددة
- 📤 **التصدير** - تصدير CSV, Excel, PDF
- 🎯 **الإجراءات** - إجراءات مخصصة لكل صف
- 📱 **متجاوب** - يعمل على جميع الأجهزة
- 🌐 **RTL** - دعم كامل للغة العربية

### 🚀 المميزات المتقدمة
- 🎨 **مواضيع متعددة** - تخصيص كامل للألوان والأنماط
- ⚡ **أداء عالي** - virtual scrolling للبيانات الكبيرة
- 🔄 **حالات التحميل** - skeleton loading وحالات فارغة
- 🎪 **إجراءات مجمعة** - تنفيذ إجراءات على صفوف متعددة
- 🎯 **فلترة متقدمة** - فلاتر مخصصة لكل عمود
- 💾 **ذاكرة الحالة** - حفظ إعدادات المستخدم

## الاستخدام الأساسي

```tsx
import { DataTable } from './components/DataTable';
import type { DataTableColumn, TableAction } from './components/DataTable/types';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UsersList: React.FC = () => {
  const columns: DataTableColumn<User>[] = [
    {
      key: 'name',
      title: 'الاسم',
      dataIndex: 'name',
      sortable: true,
      searchable: true,
    },
    {
      key: 'email',
      title: 'البريد الإلكتروني',
      dataIndex: 'email',
      searchable: true,
    },
    {
      key: 'role',
      title: 'الدور',
      dataIndex: 'role',
      filterable: true,
    },
  ];

  const actions: TableAction<User>[] = [
    {
      key: 'edit',
      label: 'تعديل',
      icon: '✏️',
      onClick: (record) => editUser(record),
    },
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      actions={actions}
      search={{ enabled: true }}
      pagination={{ enabled: true }}
      export={{ enabled: true, formats: ['csv'] }}
    />
  );
};
```

## تكوين الأعمدة

```tsx
const columns: DataTableColumn<DataType>[] = [
  {
    key: 'unique_key',           // مفتاح فريد للعمود
    title: 'عنوان العمود',        // النص المعروض في الرأس
    dataIndex: 'field_name',     // اسم الحقل في البيانات
    
    // خصائص العرض
    width: '200px',              // عرض العمود
    align: 'center',             // محاذاة النص
    ellipsis: true,              // اقتطاع النص الطويل
    
    // خصائص التفاعل
    sortable: true,              // قابل للترتيب
    searchable: true,            // قابل للبحث
    filterable: true,            // قابل للفلترة
    
    // تخصيص العرض
    render: (value, record, index) => {
      return <CustomComponent value={value} />;
    },
    
    // CSS Classes
    className: 'custom-cell',
    headerClassName: 'custom-header',
  },
];
```

## إعدادات البحث

```tsx
const searchConfig = {
  enabled: true,
  placeholder: 'البحث في البيانات...',
  debounceMs: 300,
  searchableColumns: ['name', 'email'], // أعمدة محددة للبحث
  customSearch: (searchTerm, record) => {
    // منطق بحث مخصص
    return record.name.includes(searchTerm) || 
           record.description.includes(searchTerm);
  },
};
```

## إعدادات التصفح

```tsx
const paginationConfig = {
  enabled: true,
  pageSize: 10,
  pageSizeOptions: [10, 25, 50, 100],
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: true,
  position: 'bottom', // 'top' | 'bottom' | 'both'
};
```

## الإجراءات

```tsx
// إجراءات الصفوف
const actions: TableAction<DataType>[] = [
  {
    key: 'view',
    label: 'عرض',
    icon: '👁️',
    variant: 'info',
    onClick: (record, index) => viewRecord(record),
    disabled: (record) => !record.isViewable,
    hidden: (record) => record.isDeleted,
  },
  {
    key: 'edit',
    label: 'تعديل',
    icon: '✏️',
    variant: 'warning',
    onClick: (record, index) => editRecord(record),
  },
  {
    key: 'delete',
    label: 'حذف',
    icon: '🗑️',
    variant: 'error',
    onClick: (record, index) => deleteRecord(record),
  },
];

// الإجراءات المجمعة
const bulkActions: BulkAction<DataType>[] = [
  {
    key: 'bulk-delete',
    label: 'حذف المحدد',
    icon: '🗑️',
    variant: 'error',
    onClick: (selectedRows, selectedKeys) => {
      bulkDelete(selectedRows);
    },
    disabled: (selectedRows) => selectedRows.length === 0,
  },
  {
    key: 'bulk-export',
    label: 'تصدير المحدد',
    icon: '📊',
    variant: 'primary',
    onClick: (selectedRows) => exportData(selectedRows),
  },
];
```

## التصدير

```tsx
const exportConfig = {
  enabled: true,
  formats: ['csv', 'excel', 'pdf'],
  filename: 'data_export',
  customExport: (data, format) => {
    if (format === 'custom') {
      // منطق تصدير مخصص
      customExportFunction(data);
    }
  },
};
```

## التحديد

```tsx
const selectionConfig = {
  enabled: true,
  type: 'checkbox', // 'checkbox' | 'radio'
  selectedRowKeys: selectedKeys,
  onChange: (keys, rows) => setSelectedKeys(keys),
  getCheckboxProps: (record) => ({
    disabled: record.isLocked,
  }),
};
```

## حالات التحميل والفراغ

```tsx
const loadingConfig = {
  loading: isLoading,
  skeleton: true,
  loadingText: 'جاري التحميل...',
};

const emptyStateConfig = {
  emptyText: 'لا توجد بيانات',
  emptyDescription: 'ابدأ بإضافة بيانات جديدة',
  emptyIcon: '📭',
  emptyAction: (
    <Button onClick={addNewData}>
      إضافة بيانات جديدة
    </Button>
  ),
};
```

## العمل مع البيانات من الخادم

```tsx
const serverSideConfig = {
  enabled: true,
  totalRecords: totalCount,
  onServerSearch: async (searchTerm) => {
    await fetchData({ search: searchTerm });
  },
  onServerSort: async (field, order) => {
    await fetchData({ sortField: field, sortOrder: order });
  },
  onServerFilter: async (filters) => {
    await fetchData({ filters });
  },
  onServerPagination: async (page, pageSize) => {
    await fetchData({ page, pageSize });
  },
};
```

## التخصيص المتقدم

```tsx
// تخصيص الأنماط
<DataTable
  className="custom-table"
  tableClassName="custom-table-inner"
  headerClassName="custom-header"
  bodyClassName="custom-body"
  rowClassName={(record, index) => 
    record.isImportant ? 'important-row' : 'normal-row'
  }
  
  // الأحداث
  onRowClick={(record, index) => console.log('Row clicked')}
  onRowDoubleClick={(record, index) => editRecord(record)}
  onSort={(field, order) => console.log('Sort changed')}
  onFilter={(filters) => console.log('Filters changed')}
  onSearch={(searchTerm) => console.log('Search changed')}
  onPaginationChange={(page, pageSize) => console.log('Page changed')}
  
  // خصائص التصميم
  size="lg"              // 'sm' | 'md' | 'lg'
  bordered={true}
  striped={true}
  hoverable={true}
  sticky={true}
  virtualScroll={true}   // للبيانات الكبيرة
/>
```

## استخدام Hooks المساعدة

```tsx
import { useDataTableExport, useDataTableSearch } from './components/DataTable/hooks';

const MyComponent = () => {
  // للتصدير
  const { exportToCSV, exportToJSON, printTable } = useDataTableExport();
  
  // للبحث المتقدم
  const {
    searchTerm,
    filteredData,
    updateSearch,
    updateFilter,
    clearFilters,
    getUniqueValues,
  } = useDataTableSearch(data, columns);
  
  return (
    <div>
      <button onClick={() => exportToCSV(data, columns)}>
        تصدير CSV
      </button>
      <button onClick={() => printTable(data, columns, 'تقرير البيانات')}>
        طباعة
      </button>
    </div>
  );
};
```

## أمثلة متقدمة

### جدول مع فلترة مخصصة
```tsx
const AdvancedTable = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredData = useMemo(() => {
    if (statusFilter === 'all') return data;
    return data.filter(item => item.status === statusFilter);
  }, [data, statusFilter]);
  
  return (
    <div>
      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="all">جميع الحالات</option>
        <option value="active">نشط</option>
        <option value="inactive">غير نشط</option>
      </select>
      
      <DataTable
        data={filteredData}
        columns={columns}
        // ... باقي الخصائص
      />
    </div>
  );
};
```

### جدول مع تحديث فوري
```tsx
const RealTimeTable = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(async () => {
      const freshData = await fetchLatestData();
      setData(freshData);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <DataTable
      data={data}
      columns={columns}
      loading={{ loading: !data.length }}
    />
  );
};
```

## نصائح الأداء

1. **استخدم مفاتيح فريدة**: تأكد من أن `rowKey` فريد لكل صف
2. **تحسين العرض**: استخدم `render` فقط عند الحاجة
3. **البيانات الكبيرة**: فعل `virtualScroll` للجداول الكبيرة
4. **التحميل الكسول**: استخدم server-side operations للبيانات الضخمة
5. **الذاكرة**: استخدم `useMemo` للبيانات المعالجة

## استكشاف الأخطاء

### مشاكل شائعة:
- **البيانات لا تظهر**: تحقق من `dataIndex` في الأعمدة
- **البحث لا يعمل**: تأكد من أن `searchable: true` للأعمدة المطلوبة
- **الترتيب لا يعمل**: تأكد من أن `sortable: true` للأعمدة المطلوبة
- **مشاكل الأداء**: استخدم `virtualScroll` أو server-side operations

### تسجيل الأخطاء:
```tsx
<DataTable
  // ... خصائص أخرى
  onError={(error, context) => {
    console.error('DataTable Error:', error, context);
    logError(error);
  }}
/>
```

## المساهمة

هذا المكون مصمم ليكون قابل للتوسيع. لإضافة مميزات جديدة:

1. أضف النوع المطلوب في `types.ts`
2. نفذ المنطق في `DataTable.tsx`
3. أضف الأنماط في `DataTableStyles.ts`
4. اكتب اختبارات في `__tests__/`
5. حدث التوثيق

## الترخيص

هذا المكون جزء من مشروع قساور للمقاولات.
