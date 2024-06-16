import React from 'react';
import styled, { css, keyframes } from 'styled-components';

import { useObserver } from '@/hooks/use-observer';

import { CodeBlock } from '@/components/ui/texts/code-block';

const libraries = [
  { name: '@mirawision/colorize', url: 'https://www.npmjs.com/package/@mirawision/colorize' },
];

const NpmToolsSection: React.FC = () => {
  const [observerRef, isVisible] = useObserver<HTMLDivElement>();
 
  return (
    <Container ref={observerRef}>
      <TextColumn isVisible={isVisible}>
        <h2>Our Solutions</h2>

        <p>
          At MiraWision, we’re passionate about creating tools that enhance web development and design. 
          The same innovative solutions that power our website are available for you to use in your own projects.
          <br />
          <br />
          We believe in giving back to the community and are excited to share these tools with you. 
          Explore our resources, join the conversation, and let’s build a better web together.
        </p>
      </TextColumn>

      <CardColumn isVisible={isVisible}>
        <Header>
          <ServiceLogo href='https://github.com/MiraWision' target='_blank' rel='noopener noreferrer'>
            <img src='/icons/github.svg' alt='github' />
          </ServiceLogo>

          <ServiceLogo href='https://www.npmjs.com/org/mirawision' target='_blank' rel='noopener noreferrer'>
            <img src='/icons/npm.png' alt='npm' />
          </ServiceLogo>
        </Header>

        <LibraryList>
          {libraries.map((library) => (
            <LibraryItem key={library.name}>
              <LibraryLink href={library.url} target='_blank' rel='noopener noreferrer'>
                {library.name}
              </LibraryLink>

              <CodeBlock code={`npm install ${library.name}`} />
            </LibraryItem>
          ))}
        </LibraryList>
      </CardColumn>
    </Container>
  );
};

const fadeInSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(250px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 3rem 10rem;
  display: grid;
  grid-template-columns: 2fr 2fr;
  grid-gap: 2rem;
  align-items: center;
  background-color: var(--surface-50);
`;

const Column = styled.div<{ isVisible: boolean }>`
  opacity: 0;
  animation-fill-mode: both;

  ${({ isVisible }) => isVisible && css`
    animation: ${fadeInSlideUp} 1s ease-out;
    opacity: 1;
    transform: translateY(0);
  `}
`;

const TextColumn = styled(Column)`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.125rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
    border-left: 0.25rem solid var(--primary-color);
    border-right: 0.25rem solid var(--primary-color);
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
  }
`;

const CardColumn = styled(Column)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--surface-0);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const LibraryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const LibraryItem = styled.li`
  margin-bottom: 1.5rem;
`;

const LibraryLink = styled.a`
  font-size: 1rem;
  color: var(--primary-color);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 0;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;

const ServiceLogo = styled.a`
  width: 1.5rem;
  height: 1.5rem;
  transition: transform 0.5s;

  img {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 0.25rem;
  }

  &:hover {
    transform: scale(1.35);
  }
`;

export { NpmToolsSection };
