import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { BaseLayout } from '@/layouts/base-layout';

const articles = [
  { title: 'Sample Article 1', link: '/blogs/sample1' },
  { title: 'Sample Article 2', link: '/blogs/sample2' },
  { title: 'Sample Article 3', link: '/blogs/sample3' },
];

const BlogList = () => {
  const router = useRouter();

  const goToArticle = (link: string) => {
    router.push(link);
  };

  return (
    <BaseLayout>
      <BlogContainer>
        <Title>Blog</Title>
        {articles.map((article, index) => (
          <ArticleCard key={index}>
            <Card title={article.title}>
              <Button label="Read More" icon="pi pi-arrow-right" onClick={() => goToArticle(article.link)} />
            </Card>
          </ArticleCard>
        ))}
      </BlogContainer>
    </BaseLayout>
  );
};

export default BlogList;

const BlogContainer = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`;

const ArticleCard = styled.div`
  margin-bottom: 20px;

  .p-card {
    margin-bottom: 0;
  }
`;