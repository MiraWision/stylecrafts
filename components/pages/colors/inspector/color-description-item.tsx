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
  margin: 0.2rem 0;
`;

const Row = styled.div<{ singleColumn?: boolean }>`
  display: ${({ singleColumn }) => (singleColumn ? 'flex' : 'grid')};
  width: 100%;
  flex-direction: ${({ singleColumn }) => (singleColumn ? 'row' : 'grid')};
  justify-content: ${({ singleColumn }) => (singleColumn ? 'flex-start' : 'space-between')};
  align-items: center;
  gap: ${({ singleColumn }) => (singleColumn ? '0.1rem' : '0')};
  grid-template-columns: ${({ singleColumn }) => (singleColumn ? 'unset' : '0.2fr 1fr 0.2fr')};
  margin-bottom: 0.3rem;

  & > :nth-child(2) {
    justify-self: center;
  }
`;

const Label = styled.div`
  font-weight: bold;
`;

const Value = styled.div`
  text-align: left;
  margin-left: 0.5rem;
`;

export { ColorDescriptionItem };
