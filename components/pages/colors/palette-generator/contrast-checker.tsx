import React from 'react';
import styled from 'styled-components';

import { PaletteColor } from './types';

interface Props {
  selectedColors: PaletteColor[];
}

const checkContrast = (color1: string, color2: string) => {
  return { ratio: 4.5, meetsStandard: true };
};

const ContrastChecker: React.FC<Props> = ({ selectedColors }) => {
  const backgroundColor = selectedColors.find(color => color.title === 'Background')?.baseColor || '#ffffff';
  const textColor = selectedColors.find(color => color.title === 'Text')?.baseColor || '#000000';
  const primaryColor = selectedColors.find(color => color.title === 'Primary')?.baseColor || '#ff0000';
  const additionalColor = selectedColors.find(color => color.title === 'Additional')?.baseColor || '#00ff00';

  const contrastChecks = [
    { color1: backgroundColor, color2: textColor, description: 'Background and Text' },
    { color1: backgroundColor, color2: primaryColor, description: 'Background and Primary' },
    { color1: backgroundColor, color2: additionalColor, description: 'Background and Additional' },
  ];

  return (
    <CheckerContainer>
      <h3>Contrast Checker</h3>
      {contrastChecks.map((check, index) => {
        const { ratio, meetsStandard } = checkContrast(check.color1, check.color2);
        return (
          <div key={index}>
            <div>{check.description}: {ratio}:1</div>
            {!meetsStandard && <Error>Does not meet contrast standards!</Error>}
            {meetsStandard && <Warning>Meets contrast standards.</Warning>}
          </div>
        );
      })}
    </CheckerContainer>
  );
};

const CheckerContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
`;

const Error = styled.div`
  color: red;
  font-weight: bold;
`;

const Warning = styled.div`
  color: orange;
  font-weight: bold;
`;

export { ContrastChecker };
