

export interface FormPageBaseProps {
  onNextStep: (method?: string) => void;
  onBack?: () => void;
}

export interface FormPageWithDataProps<T> extends FormPageBaseProps {
  formData: T;
  updateFormData: (data: Partial<T>) => void;
}

export interface FormBaseData {
  isValid: boolean;
}
export interface PageData {
  title: string;
  description: string;
  component: React.ComponentType<FormPageBaseProps & Record<string, unknown>>;
}