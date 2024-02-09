// axios-extension.d.ts
import axios from 'axios';

declare global {
  interface Window {
    $message: {
      success: (message: string) => void;
      error: (message: string) => void;
    };
  };
}

declare module axios {
  export interface AxiosRequestConfig {
    showLoading?: boolean;
  }
}