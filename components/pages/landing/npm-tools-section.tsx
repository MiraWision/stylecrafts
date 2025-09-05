import React from 'react';
import styled from 'styled-components';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';

import { CodeBlock } from '@/components/ui/texts/code-block';
import { Column, Container, Headline, TextColumn } from './common';

const libraries = [
  { name: '@mirawision/colorize', url: 'https://www.npmjs.com/package/@mirawision/colorize' },
  { name: '@mirawision/usa-map-react', url: 'https://www.npmjs.com/package/@mirawision/usa-map-react' },
];

const NpmToolsSection: React.FC = () => {
  return (
    <Container>
      <Headline>{'{ OUR SOLUTIONS }'}</Headline>

      <Row>
        <TextColumn>
          <p>
            At MiraWision, we're passionate about creating tools that enhance web development and design. 
            The same innovative solutions that power our website are available for you to use in your own projects.
          </p>
          <p>
            We believe in giving back to the community and are excited to share these tools with you. 
            Explore our resources, join the conversation, and let's build a better web together.
          </p>
        </TextColumn>

        <CardColumn>
          <Header>
            <ServiceLogo 
              href='https://github.com/MiraWision' 
              target='_blank' 
              rel='noopener noreferrer'
              onClick={() => GAService.logEvent(analyticsEvents.general.landingGithubOpened('MiraWision'))}
            >
              <img src='/icons/github.svg' alt='github' />
            </ServiceLogo>

            <ServiceLogo 
              href='https://www.npmjs.com/org/mirawision' 
              target='_blank' 
              rel='noopener noreferrer'
              onClick={() => GAService.logEvent(analyticsEvents.general.landingNpmOpened('mirawision'))}
            >
              <img src='/icons/npm.png' alt='npm' />
            </ServiceLogo>
          </Header>

          <LibraryList>
            {libraries.map((library) => (
              <LibraryItem key={library.name}>
                <LibraryLink 
                  href={library.url} 
                  target='_blank' 
                  rel='noopener noreferrer'
                  onClick={() => GAService.logEvent(analyticsEvents.general.landingLibraryClicked(library.name))}
                >
                  {library.name}
                </LibraryLink>

                <CodeBlock 
                  code={`npm install ${library.name}`}
                  onCopy={() => GAService.logEvent(analyticsEvents.general.landingLibraryCopied(library.name))}
                />
              </LibraryItem>
            ))}
          </LibraryList>
        </CardColumn>
      </Row>
    </Container>
  );
};

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 2rem;
  margin-top: 20vh;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 2rem;
    gap: 1rem;
  }
`;

const CardColumn = styled(Column)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--surface-0);
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    padding: 1rem;
  }
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
