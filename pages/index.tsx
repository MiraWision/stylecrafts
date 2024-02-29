import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { BaseLayout } from '@/layouts/base-layout';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/colors-converter');
  }, [router]);

  return (
    <BaseLayout>
      <div>Redirecting...</div>
    </BaseLayout>
  );
}

export default Home;
