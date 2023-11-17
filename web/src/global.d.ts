// axios-extension.d.ts
import axios, { AxiosRequestConfig } from 'axios';

declare interface Window {
  $message: {
    success: (message: string) => void;
    error: (message: string) => void;
  };
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    showLoading?: boolean;
  }
}