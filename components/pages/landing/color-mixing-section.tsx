import React from 'react';
import styled, { css } from 'styled-components';

import { useObserver } from '@/hooks/use-observer';

import { Column, Container, Headline, TextColumn, fadeInSlideUp } from './common';
import { Routes } from '@/content/routes';
import { CheckmarkCircleIcon } from '@/components/icons/checkmark-circle';
import { CrossCircleIcon } from '@/components/icons/cross-circle';

const ColorMixingSection: React.FC = () => {
  const [observerRef, isVisible] = useObserver<HTMLDivElement>();
 
  return (
    <Container ref={observerRef}>
      <Headline>Discover Realistic Color Mixing</Headline>

      <Row>
        <TextColumn $isVisible={isVisible}>
          <p>
            Most programmatic color mixing algorithms often produce unrealistic results.
            Considering this, we've developed an innovative color model and mixing algorithm that
            mimics the way colors blend in the real world.
          </p>
          
          <p>
            Whether you're working on digital art, web design, or any creative project,
            our advanced algorithm will provide a true-to-life color blending experience.
            Ready to see it in action? Try the <a href={Routes.ColorsMixerTool} target='_blank'>Color Mixer Tool</a> now!
          </p>
          
          <p className='accent'>
            If you're interested in licensing this powerful algorithm for your own projects, 
            please <a href='mailto:yelysei277@gmail.com'>contact me</a>. 
            I'd love to discuss how we can collaborate to bring your vision to life.
          </p>
        </TextColumn>

        <ExamplesColumn $isVisible={isVisible}>
          <MainExample>
            <figure>
              <img src='/landing/mix-best.png' alt='Correct Color Mixing Example' />
              
              <figcaption>
                <CheckmarkCircleIcon width='36' height='36' />
              </figcaption>
            </figure>
          </MainExample>

          <WrongExamples>
            {['mix-wrong-1.png', 'mix-wrong-2.png', 'mix-wrong-3.png', 'mix-wrong-4.png'].map((src, index) => (
              <figure key={index}>
                <img src={`/landing/${src}`} alt='Incorrect Color Mixing Example' />
                
                <figcaption>
                  <CrossCircleIcon width='24' height='24' />
                </figcaption>
              </figure>  
            ))}
          </WrongExamples>
        </ExamplesColumn>
      </Row>
    </Container>
  );
};

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ExamplesColumn = styled(Column)`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 768px) {
    width: 95%;
    margin: 0 auto;
  }
`;

const MainExample = styled.div`
  display: flex;
  flex-direction: column;

  img {
    width: 15rem;
  }

  figcaption {
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
    font-size: 2rem;
    color: var(--green-500);
  }
`;

const WrongExamples = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;

  img {
    width: 7rem;
  }

  figcaption {
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    color: var(--red-500);
  }
`;

export { ColorMixingSection };
