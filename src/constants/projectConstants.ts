// Work Order Status Options
export const WORK_ORDER_STATUS_OPTIONS = [
  'تم استلام الطلب',
  'تمت اصدار الرخصة',
  'اجراءات اصدار الرخص',
  'تحت التنفيذ',
  'انتظار صرف المواد',
  'اكتمل /لم يتم الصرف',
  'اكتمل /تم الصرف',
  'مكتمل',
  'مستلم امر عمل',
  'اصدار شهادة انجاز',
  'اصدار مستخلص',
  'غير مدفوع',
  'مدفوع',
  'ملغي'
];

// Job Type Options
export const JOB_TYPE_OPTIONS = [
  'بناء',
  'هدم',
  'صيانة',
  'تطوير'
];

// Work Items Table Columns
export const WORK_ITEMS_COLUMNS = [
  {
    key: 'item_name',
    label: 'اسم البند',
    type: 'text' as const,
    placeholder: 'أدخل اسم البند'
  },
  {
    key: 'quantity',
    label: 'الكمية',
    type: 'number' as const,
    min: 0,
    step: 1,
    placeholder: '0'
  },
  {
    key: 'unit',
    label: 'الوحدة',
    type: 'text' as const,
    placeholder: 'متر، قطعة، كيلو...'
  },
  {
    key: 'unit_price',
    label: 'سعر الوحدة',
    type: 'number' as const,
    min: 0,
    step: 0.01,
    placeholder: '0.00'
  },
  {
    key: 'total_amount',
    label: 'المجموع',
    type: 'number' as const,
    min: 0,
    step: 0.01,
    placeholder: '0.00'
  },
  {
    key: 'description',
    label: 'الوصف',
    type: 'text' as const,
    placeholder: 'وصف البند'
  }
];

// File Upload Accept Types
export const FILE_ACCEPT_TYPES = '.pdf,.jpg,.jpeg,.png,.doc,.docx';

// Default Form Values
export const DEFAULT_PROJECT_FORM = {
  wo_num1: '',
  work_order_status1: 'تم استلام الطلب',
  job_type1: '',
  create_date1: new Date().toISOString().split('T')[0],
  acc_name1: '',
  work_items_details1: [],
  company: 'Default Company'
};
