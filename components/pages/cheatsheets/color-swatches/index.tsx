import React from 'react';
import styled from 'styled-components';

import { colorPalettes } from './data';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';
import { generateSlug } from '@/utils/text';

import { MainContainer, SingleColumnContainer } from '@/components/ui/containers';
import { FloatingMenu } from '../floating-menu';

interface Props {
}

const ColorSwatchesCheatSheetMain: React.FC<Props> = ({}) => {
  const onCopy = (text: string) => {
    GAService.logEvent(analyticsEvents.cheatsheets.characters.characterCopied(text));
  }

  return (
    <MainContainer>
      <FloatingMenu 
        sections={colorPalettes.map((group) => ({ id: generateSlug(group.groupName), title: `${group.groupName} Shades` }))} 
      />

      <SingleColumnContainer>
        {colorPalettes.map(({ groupName, colors }) => (
          <React.Fragment key={groupName}>
            <GroupTitle key={groupName} id={generateSlug(groupName)}>
              {groupName} shades
            </GroupTitle>

            <Container>
              {colors.map((color) => (
                <ColorCard key={color.title} onClick={() => {}}>          
                  <ColorName>
                    {color.title}
                  </ColorName>

                  <ColorSquare color={color.hex} />
                </ColorCard>
              ))}
            </Container>
          </React.Fragment>
        ))}
        </SingleColumnContainer>
    </MainContainer>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem 2rem;
  margin-bottom: 2rem;
`;

const GroupTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--color-text);
  margin: 0;
  text-transform: capitalize;
  align-self: flex-start;
`;

const ColorCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  max-width: 8rem;
`;

const ColorSquare = styled.div<{ color: string }>`
  width: 8rem;
  height: 2rem;
  border-radius: 0.25rem;
  border: 0.0625rem solid var(--surface-border);
  background-color: ${({ color }) => color};
`;

const ColorName = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 0.125rem;
  white-space: nowrap;
`;

export { ColorSwatchesCheatSheetMain };