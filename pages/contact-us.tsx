import React from 'react';

import { content } from '@/content/legal-documents/contact-us';
import { metaTags } from '@/content/meta-data/contact-us';

import { BaseLayout } from '@/layouts/base-layout';
import { MetaTags } from '@/components/pages/meta-tags';
import { Markdown } from '@/components/ui/texts/markdown';
import { DocumentContainer } from '@/components/ui/containers';

const ContactUsPage: React.FC = () => {
  return (
    <BaseLayout>
      <MetaTags {...metaTags} />
      
      <DocumentContainer>
        <Markdown markdownText={content} />

        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSe8mFo8N9rEzaMCzv1AOQFLRiEr-2NqeUWk9qB67IehAGGsqA/viewform?embedded=true" width="576" height="900">Loading…</iframe>
      </DocumentContainer>
    </BaseLayout>
  );
};

export default ContactUsPage; 