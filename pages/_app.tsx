import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { initGA, logPageView } from '../lib/gtag';

import '../styles/global.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!(window as any).GA_INITIALIZED) {
      initGA('G-XXXXXXXXXX'); // ID GA4
      (window as any).GA_INITIALIZED = true;
    }
    logPageView();
    router.events.on('routeChangeComplete', logPageView);
    return () => {
      router.events.off('routeChangeComplete', logPageView);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
};

export default MyApp;