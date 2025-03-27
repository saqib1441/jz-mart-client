import { ReactNode } from "react";

export interface PayloadInterface {
  success: boolean;
  message: string;
  data: UserData | null;
}

export interface SearchComponent {
  className: string;
}

export interface StoreProviderProps {
  children: ReactNode;
}

export interface UserData {
  fullname?: string;
  email?: string;
  password?: string;
  otp?: string;
  purpose?: string;
}

export interface AuthState {
  loading: boolean;
  error: string | null;
  tempData: UserData | null;
  data: UserData | null;
  isLoggedIn: boolean;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: UserData | null;
}
