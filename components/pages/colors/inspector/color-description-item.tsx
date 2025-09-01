import React from 'react';
import styled from 'styled-components';
import { CopyIconButton } from '@/components/ui/icon-buttons/copy-icon-button';
import { Slider } from 'primereact/slider';
import { ColorScale } from './color-scale';

interface Props {
  label: string;
  value: string | number;
  copyable?: boolean;
  scaleValue?: number;
  scaleGradient?: string[];
  singleColumn?: boolean;
}

const ColorDescriptionItem: React.FC<Props> = ({ label, value, copyable, scaleValue, scaleGradient, singleColumn }) => {
  return (
    <Container>
      <Row singleColumn={singleColumn}>
        <Label>{label}:</Label>
        <Value>{value}</Value>
        {copyable && <CopyIconButton text={String(value)} />}
      </Row>

      {scaleValue !== undefined && scaleGradient?.length && (
        <ColorScale
          labels={[
            { value: 0, label: 'Low' },
            { value: 1, label: 'High' }
          ]}
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
  margin: 0.05rem 0;
`;

const Row = styled.div<{ singleColumn?: boolean }>`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.1rem;
  min-width: 0;
`;

const Label = styled.div`
  font-weight: bold;
  flex-shrink: 0;
`;

const Value = styled.div`
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
`;

export { ColorDescriptionItem };
