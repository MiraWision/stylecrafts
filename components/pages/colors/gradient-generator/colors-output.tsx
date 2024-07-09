import React from 'react';
import styled from 'styled-components';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';

import { CopyIconButton } from '../../../ui/icon-buttons/copy-icon-button';

interface Props {
  colors: string[];
}

const ColorsOutput: React.FC<Props> = ({ colors }) => {
  const handleCopy = (color: string) => {
    GAService.logEvent(analyticsEvents.colors.gradient.colorCopied(color));
  }

  return (
    <ColorsList>
      {colors.map((color, index) => (
        <React.Fragment key={index}>
          <ColorRectangle $backgroundColor={color} />

          <ColorText>{color}</ColorText>
          
          <CopyIconButton 
            text={color}
            label='Color'
            onCopyCallback={() => handleCopy(color)}
          />
        </React.Fragment>
      ))}
    </ColorsList>
  );
}

const ColorsList = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.25rem;
  width: fit-content;
  align-items: center;
`;

const ColorRectangle = styled.div.attrs<{ $backgroundColor: string }>(({ $backgroundColor }) => ({
  style: {
    backgroundColor: $backgroundColor,
  },
}))`
  width: 3rem;
  height: 1.5rem;
  border-radius: 0.25rem;
`;

const ColorText = styled.div`
  margin: 0.25rem;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--surface-900);
`;

export { ColorsOutput };