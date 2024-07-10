import React from 'react';
import styled from 'styled-components';
import { convertColor, ColorFormat, getLuminance } from '@mirawision/colorize';

import { colorPalettes } from './data';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';
import { generateSlug } from '@/utils/text';

import { MainContainer, SingleColumnContainer } from '@/components/ui/containers';
import { FloatingMenu } from '../floating-menu';
import { CopyIconButton } from '@/components/ui/icon-buttons/copy-icon-button';
import { ColorCard } from '@/components/ui/colors/color-card';

interface Props {}

const ColorSwatchesCheatSheetMain: React.FC<Props> = ({}) => {
  const onCopy = (text: string) => {
    GAService.logEvent(analyticsEvents.cheatsheets.characters.characterCopied(text));
  };

  const getTextColor = (bgColor: string) => {
    const luminance = getLuminance(bgColor);
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
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
                />
              ))}

              {/* {colors.map((color) => (
                <ColorCard key={color.title}>
                  <ColorName>{color.title}</ColorName>

                  <ColorSquare $backgroundColor={color.hex} $color={getTextColor(color.hex)}>
                    <FormatPanel $backgroundColor={color.hex}>
                      <Format>
                        HEX
                        <CopyButtonSmall text={color.hex} onCopyCallback={() => onCopy(color.hex)} $color={getTextColor(color.hex)} />
                      </Format>
                      <Format>
                        RGB
                        <CopyButtonSmall text={convertColor(color.hex, ColorFormat.RGB)} onCopyCallback={() => onCopy(convertColor(color.hex, ColorFormat.RGB))} $color={getTextColor(color.hex)} />
                      </Format>
                      <Format>
                        HSL
                        <CopyButtonSmall text={convertColor(color.hex, ColorFormat.HSL)} onCopyCallback={() => onCopy(convertColor(color.hex, ColorFormat.HSL))} $color={getTextColor(color.hex)} />
                      </Format>
                    </FormatPanel>
                  </ColorSquare>
                </ColorCard>
              ))} */}
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

// const ColorCard = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   cursor: pointer;
//   max-width: 8rem;
// `;

const ColorSquare = styled.div.attrs<{ $backgroundColor: string; $color: string }>(({ $backgroundColor, $color }) => ({
  style: {
    backgroundColor: $backgroundColor,
    color: $color,
  },
}))`
  width: 8rem;
  height: 2rem;
  border: 0.0625rem solid var(--surface-border);
  border-radius: 0.25rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;

  &:hover div {
    display: flex;
    max-height: 100px;
  }
`;

const ColorName = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 0.125rem;
  white-space: nowrap;
`;

const FormatPanel = styled.div.attrs<{ $backgroundColor: string }>(({ $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
  },
}))`
  display: none;
  flex-direction: column;
  align-items: flex-start;
  border: none;
  padding: 0.5rem;
  width: 100%;
  position: absolute;
  top: 1rem;
  left: 0;
  right: 0;
  overflow: hidden;
  max-height: 0;
  transition: max-height 2s ease-in-out;
  z-index: 10;
`;

const Format = styled.div`
  font-size: 0.55rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: inherit;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CopyButtonSmall = styled(CopyIconButton).attrs<{ $color: string }>(({ $color }) => ({
  style: {
    color: $color,
  },
}))`
  .pi {
    font-size: 0.75rem;
  }

  button {
    padding: 0;
    height: auto;
  }
`;

export { ColorSwatchesCheatSheetMain };