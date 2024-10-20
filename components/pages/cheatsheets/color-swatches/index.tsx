import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { colorPalettes } from './data';

import { generateSlug } from '@/utils/text';

import { MainContainer, SingleColumnContainer } from '@/components/ui/containers';
import { FloatingMenu } from '../floating-menu';
import { ColorCard } from '@/components/ui/colors/color-card';

interface Props {}

const ColorSwatchesCheatSheetMain: React.FC<Props> = () => {
  return (
    <MainContainer>
      <FloatingMenu
        sections={colorPalettes.map((group) => ({
          id: generateSlug(group.groupName),
          title: `${group.groupName} Shades`,
        }))}
      />

      <SingleColumnContainer>
        {colorPalettes.map(({ groupName, colors }) => (
          <React.Fragment key={groupName}>
            <GroupTitle id={generateSlug(groupName)}>
              {groupName} shades
            </GroupTitle>

            <Container>
              {colors.map((color) => (
                <Link
                  href={`/colors/inspector?color=${encodeURIComponent(color.hex)}`}
                  key={color.title}
                  passHref
                  legacyBehavior
                >
                  <StyledLink>
                    <ColorCard color={color.hex} title={color.title} />
                  </StyledLink>
                </Link>
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
  grid-template-columns: repeat(5, 1fr);
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

const StyledLink = styled.div`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  cursor: pointer;
`;

export { ColorSwatchesCheatSheetMain };
