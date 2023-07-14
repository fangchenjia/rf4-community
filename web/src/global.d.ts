declare interface Window {
  $message: {
    success: (message: string) => void;
    error: (message: string) => void;
  };
}