import React from 'react';
import styled from 'styled-components';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';

import { CopyIconButton } from '../../../ui/icon-buttons/copy-icon-button';
import { ColorTag } from '@/components/ui/colors/color-tag';

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
        <ColorTag 
          key={index}
          color={color}
          onCopy={() => handleCopy(color)}  
        />
      ))}
    </ColorsList>
  );
}

const ColorsList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.25rem;
  width: fit-content;
  align-items: center;
`;

export { ColorsOutput };