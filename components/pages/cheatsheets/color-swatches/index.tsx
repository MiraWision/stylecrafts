import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';
import { useToast } from '@/components/ui/toast';

import { colorPalettes } from './data';
import { generateSlug } from '@/utils/text';
import { MainContainer } from '@/components/ui/containers';
import { FloatingMenu } from '../floating-menu';
import { ColorCard } from '@/components/ui/colors/color-card';
import { ToolCrossLinks } from '@/components/ui/cross-links/tool-cross-links';

interface Props {}

const ColorSwatchesCheatSheetMain: React.FC<Props> = () => {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCopy = (text: string) => {
    if (isClient && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success('Copied!', 'Color copied to clipboard');
      
      GAService.logEvent(analyticsEvents.cheatsheets.colorSwatches.colorCopied(text));
    }
  };

  return (
    <MainContainer>
      <FloatingMenu
        sections={colorPalettes.map((group) => ({
          id: generateSlug(group.groupName),
          title: `${group.groupName} Shades`,
        }))}
      />

      <MobileSingleColumnContainer>
        {colorPalettes.map(({ groupName, colors }) => (
          <React.Fragment key={groupName}>
            <GroupTitle id={generateSlug(groupName)}>
              {groupName} shades
            </GroupTitle>

            <Container>
              {colors.map((color) => (
                <ColorCard
                  key={color.title}
                  color={color.hex}
                  title={color.title}
                  onCopy={isClient ? handleCopy : undefined}
                  onClick={() => setHoveredColor(color.hex)}
                />
              ))}
            </Container>
          </React.Fragment>
        ))}
      </MobileSingleColumnContainer>

      <ToolCrossLinks
        toolKey="color-swatches"
        title="Explore More Color Tools"
      />
    </MainContainer>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem 2rem;
  margin-bottom: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(6.5rem, 1fr));
    gap: 0.7rem 1rem;
  }
  @media (max-width: 400px) {
    grid-template-columns: repeat(auto-fit, minmax(6.5rem, 1fr));
    gap: 0.5rem 0.5rem;
  }
`;

const GroupTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--color-text);
  margin: 0 0 0.5rem 0;
  text-transform: capitalize;
  align-self: flex-start;

  @media (max-width: 600px) {
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }
`;

const MobileSingleColumnContainer = styled.div`
  width: 100%;
  @media (max-width: 400px) {
    overflow-x: auto;
  }
`;

export { ColorSwatchesCheatSheetMain };
