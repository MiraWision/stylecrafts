import React from 'react';
import styled from 'styled-components';
import { copyText } from '@mirawision/copily';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';
import { useToast } from '@/components/ui/toast';

import { ColorTag } from '@/components/ui/colors/color-tag';

interface Props {
  colors: string[];
}

const ColorsOutput: React.FC<Props> = ({ colors }) => {
  const { toast } = useToast();

  const handleCopy = (color: string) => {
    copyText(color)
      .then(() => {
        GAService.logEvent(analyticsEvents.colors.gradient.colorCopied(color));
        toast.success('Copied!', 'Color copied to clipboard')
      })
      .catch((err: Error) => {
        console.error('Failed to copy the color: ', err);
      });
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