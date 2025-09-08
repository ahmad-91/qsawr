import { useState, useCallback } from 'react';
import { ProjectFormData, WorkItem, FormErrors } from '../types/projectTypes';
import { DEFAULT_PROJECT_FORM } from '../constants/projectConstants';

export const useProjectForm = () => {
  const [formData, setFormData] = useState<ProjectFormData>(DEFAULT_PROJECT_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleInputChange = useCallback((field: keyof ProjectFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  }, [errors]);

  // Handle file uploads
  const handleFileUpload = useCallback((field: keyof ProjectFormData, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  }, []);

  // Add work item
  const addWorkItem = useCallback(() => {
    const newItem: WorkItem = {
      id: Date.now().toString(),
      item_name: '',
      description: '',
      quantity: 0,
      unit: '',
      unit_price: 0,
      total_amount: 0
    };

    setFormData(prev => ({
      ...prev,
      work_items_details1: [...prev.work_items_details1, newItem]
    }));
  }, []);

  // Update work item
  const updateWorkItem = useCallback((id: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      work_items_details1: prev.work_items_details1.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          
          // Auto-calculate total amount
          if (field === 'quantity' || field === 'unit_price') {
            updatedItem.total_amount = updatedItem.quantity * updatedItem.unit_price;
          }
          
          return updatedItem;
        }
        return item;
      })
    }));
  }, []);

  // Remove work item
  const removeWorkItem = useCallback((id: string) => {
    setFormData(prev => ({
      ...prev,
      work_items_details1: prev.work_items_details1.filter(item => item.id !== id)
    }));
  }, []);

  // Validate form
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.wo_num1.trim()) {
      newErrors.wo_num1 = 'رقم الطلب مطلوب';
    }

    if (!formData.acc_name1.trim()) {
      newErrors.acc_name1 = 'اسم المشتري مطلوب';
    }

    if (formData.work_items_details1.length === 0) {
      newErrors.work_items_details1 = 'يجب إضافة بند واحد على الأقل';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Submit form
  const submitForm = useCallback(async (onSuccess?: () => void) => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Here you would typically make an API call
      console.log('Submitting form data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onSuccess?.();
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'حدث خطأ أثناء حفظ البيانات' });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  // Reset form
  const resetForm = useCallback(() => {
    setFormData(DEFAULT_PROJECT_FORM);
    setErrors({});
    setIsSubmitting(false);
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleFileUpload,
    addWorkItem,
    updateWorkItem,
    removeWorkItem,
    validateForm,
    submitForm,
    resetForm
  };
};
