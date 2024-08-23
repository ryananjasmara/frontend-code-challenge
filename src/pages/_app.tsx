import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import '../app/globals.css';
import IssuesProvider from '@/pages/contexts/Issues.context';
import ToastProvider from '@/pages/contexts/Toast.context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false
    },
    mutations: {
      retry: 0,
    }
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <IssuesProvider>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </IssuesProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
