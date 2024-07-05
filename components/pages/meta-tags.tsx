import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { MetaTags as IMetaTags } from '@/content/meta-data/types';

const defaultImage = '/meta-data/default.jpg';

const MetaTags: React.FC<IMetaTags> = ({ title, description, keywords, image, url }) => {
  const router = useRouter();

  const siteTitle = `${title} | CSSCraft`;

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords?.join(', ')} />
      <meta property='og:title' content={siteTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image || defaultImage} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:url' content={`${url}${router.asPath}`} />
      <meta property='og:locale' content='en_US' />
      <meta property='og:type' content='website' />
      <meta name='twitter:title' content={siteTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image || defaultImage} />
      <meta name='twitter:image:width' content='1200' />
      <meta name='twitter:image:height' content='630' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta name='robots' content='index, follow' />
    </Head>
  );
};

export { MetaTags };
