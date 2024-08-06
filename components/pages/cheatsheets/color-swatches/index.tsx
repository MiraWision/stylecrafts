import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { getLuminance } from '@mirawision/colorize';

import { colorPalettes } from './data';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';
import { generateSlug } from '@/utils/text';

import { MainContainer, SingleColumnContainer } from '@/components/ui/containers';
import { FloatingMenu } from '../floating-menu';
import { ColorCard } from '@/components/ui/colors/color-card';

interface Props {}

const ColorSwatchesCheatSheetMain: React.FC<Props> = ({}) => {
  const router = useRouter();

  const onCopy = (text: string) => {
    GAService.logEvent(analyticsEvents.cheatsheets.characters.characterCopied(text));
  };

  const getTextColor = (bgColor: string) => {
    const luminance = getLuminance(bgColor);
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  const handleCardClick = (color: string) => {
    router.push(`/colors/inspector#${color}`);
  };

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
                <ColorCard 
                  key={color.title}
                  color={color.hex}
                  title={color.title}
                  onClick={() => handleCardClick(color.hex)}
                />
              ))}
            </Container>
          </React.Fragment>
        ))}
      </SingleColumnContainer>
    </MainContainer>
  );
};

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

export { ColorSwatchesCheatSheetMain };
