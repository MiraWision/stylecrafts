import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';

import { GAService } from '../services/google-analytics-service';

import { ToastProvider } from '@/components/ui/toast';

import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import '../styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!(window as any).GA_INITIALIZED) {
      GAService.init('G-PX4Y8BRFHB');
      
      (window as any).GA_INITIALIZED = true;
    }

    GAService.logPageView();

    router.events.on('routeChangeComplete', GAService.logPageView);

    return () => {
      router.events.off('routeChangeComplete', GAService.logPageView);
    };
  }, [router.events]);

  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
};

export default MyApp;