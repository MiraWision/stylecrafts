import React from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';
import { randomColor } from '@mirawision/colorize';

interface SingleColorProps {
  onRandomColorGenerated?: (color: string) => void;
}

interface MultiColorProps {
  onRandomColorsGenerated?: (bgColor: string, textColor: string) => void;
}

type Props = SingleColorProps & MultiColorProps;

const RandomColorButton: React.FC<Props> = (props) => {
  const generateRandomColor = () => {
    if (props.onRandomColorGenerated) {
      const color = randomColor();
      props.onRandomColorGenerated(color);
    } else if (props.onRandomColorsGenerated) {
      const bgColor = randomColor();
      const textColor = randomColor();
      props.onRandomColorsGenerated(bgColor, textColor);
    } else {
      throw new Error('No valid handler provided to RandomColorButton');
    }
  };

  return (
    <ButtonContainer>
      <ButtonSmall icon='pi pi-sync' onClick={generateRandomColor} />
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  right: -1.5rem;
`;

const ButtonSmall = styled(Button)`
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  color: var(--primary-color);
  border: none;
  background: none;

  &:focus {
    box-shadow: none;
  }

  .pi {
    color: var(--primary-color);
  }
`;

export { RandomColorButton };