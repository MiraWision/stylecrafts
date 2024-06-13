import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { MetaTags } from '@/content/meta-data/types';

const defaultImage = '../../public/meta-data/image-1.jpeg';

const MetaTagsPage: React.FC<MetaTags> = ({ title, description, keywords, image, url }) => {
  const router = useRouter();
  const siteTitle = `${title} | CSSCraft`;

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords?.join(', ')} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={`${url}${router.asPath}`} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export { MetaTagsPage };
