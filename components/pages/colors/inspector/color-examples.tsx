import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { ColorExample } from './types';
import { colorsExamples } from './examples';

interface Props {
  onColorSelect: (color: ColorExample) => void;
}

const ColorExamples: React.FC<Props> = ({ onColorSelect }) => {
  const router = useRouter();

  const handleColorSelect = (color: ColorExample) => {
    const hex = color.color.replace('#', '');
    router.push(`/colors/inspector#${hex}`, undefined, { shallow: true });
    onColorSelect(color);
  };

  return (
    <Container>
      {colorsExamples.map((color) => (
        <ColorCard key={color.name} onClick={() => handleColorSelect(color)}>
          <ColorName>{color.name}</ColorName>
          <ColorSquare backgroundColor={color.color} />
        </ColorCard>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem 1rem;
  }
`;

const ColorCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  max-width: 6rem;
`;

const ColorSquare = styled.div<{ backgroundColor: string }>`
  width: 6rem;
  height: 2rem;
  border-radius: 0.25rem;
  border: 0.0625rem solid var(--surface-border);
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const ColorName = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 0.125rem;
  white-space: nowrap;
`;

export { ColorExamples };
