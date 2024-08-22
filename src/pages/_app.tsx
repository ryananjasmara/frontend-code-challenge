import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import '../app/globals.css';
import { IssuesProvider } from '@/pages/contexts/Issues.context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <IssuesProvider>
        <Component {...pageProps} />
      </IssuesProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
