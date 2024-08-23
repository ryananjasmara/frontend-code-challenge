import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import '../app/globals.css';
import ToastProvider from '@/pages/contexts/Toast.context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false
    },
    mutations: {
      retry: 0
    }
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
