import React from 'react';
import styled from 'styled-components';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';

import { CopyIconButton } from '@/components/ui/icon-buttons/copy-icon-button';
import { Slider } from 'primereact/slider';
import { ColorScale } from './color-scale';

interface Props {
  label: string;
  value: string | number;
  copyable?: boolean;
  scaleValue?: number;
  scaleGradient?: string[];
}

const ColorDescriptionItem: React.FC<Props> = ({ label, value, copyable, scaleValue, scaleGradient }) => {
  return (
    <Container>
      <Row>
        <Label>{label}</Label>
        <Value>{value}</Value>
        {copyable && (
          <CopyIconButton
            text={String(value)}
            onCopyCallback={() => {
              GAService.logEvent(analyticsEvents.colors.inspector.colorCopied(String(value)));
            }}
          />
        )}
      </Row>

      {scaleValue !== undefined && scaleGradient?.length && (
        <ColorScale
          scaleGradient={scaleGradient}
          scaleValue={scaleValue}
          width={100}
        />
      )}

      {scaleValue !== undefined && !scaleGradient?.length && <Slider value={scaleValue} min={0} max={100} disabled />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr 2rem;
  align-items: center;
  gap: 1rem;
  width: 100%;
  min-width: 0;
`;

const Label = styled.div`
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--surface-900);
  flex-shrink: 0;
`;

const Value = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: var(--surface-900);
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
`;

export { ColorDescriptionItem };
