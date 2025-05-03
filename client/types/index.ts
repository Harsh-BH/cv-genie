
// Toast Types
export type ToastType = 'success' | 'error' | 'warning' | 'info';
export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

// Form Data Types
export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
