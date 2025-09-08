// Work Item Interface
export interface WorkItem {
  id: string;
  item_name: string;
  description: string;
  quantity: number;
  unit: string;
  unit_price: number;
  total_amount: number;
}

// Project Form Data Interface
export interface ProjectFormData {
  wo_num1: string;
  work_order_status1: string;
  job_type1: string;
  create_date1: string;
  acc_name1: string;
  work_items_details1: WorkItem[];
  wo_attach_file?: File;
  indx_date?: string;
  wo_license_file?: File;
  lisence_date?: string;
  license_date_due?: string;
  exp_lisence_date?: string;
  complete_work_date?: string;
  team_la?: string;
  team_la_name?: string;
  district_name?: string;
  company: string;
}

// Form Validation Errors
export interface FormErrors {
  [key: string]: string;
}

// Form Submission State
export interface FormSubmissionState {
  isSubmitting: boolean;
  errors: FormErrors;
  success: boolean;
}
