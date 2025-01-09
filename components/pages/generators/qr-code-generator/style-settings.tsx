import React, { useMemo } from 'react';
import styled from 'styled-components';
import { calculateContrast } from '@mirawision/colorize/calculate-contrast';

import { CellShape, EyeShape, Settings } from './types';

import { Label } from '@/components/ui/texts/label';

import { QRPattern1Icon } from '@/components/icons/qr-pattern-1';
import { QRPattern2Icon } from '@/components/icons/qr-pattern-2';
import { QRPattern3Icon } from '@/components/icons/qr-pattern-3';
import { QRPattern4Icon } from '@/components/icons/qr-pattern-4';
import { QRPattern5Icon } from '@/components/icons/qr-pattern-5';
import { QRPattern6Icon } from '@/components/icons/qr-pattern-6';
import { QRPattern7Icon } from '@/components/icons/qr-pattern-7';
import { QRPattern8Icon } from '@/components/icons/qr-pattern-8';
import { QREyePattern1Icon } from '@/components/icons/qr-eye-pattern-1';
import { QREyePattern2Icon } from '@/components/icons/qr-eye-pattern-2';
import { QREyePattern3Icon } from '@/components/icons/qr-eye-pattern-3';
import { QREyePattern4Icon } from '@/components/icons/qr-eye-pattern-4';
import { IconButtonGroup } from '@/components/ui/icon-button-group';
import { ColorInput } from '@/components/ui/inputs/color-input';
import { QRExampleIcon } from '@/components/icons/qr-example';
import { colorExamples } from './color-examples';
import { WarningIcon } from '@/components/icons/warning';

interface Props {
  settings: Settings;
  setSettings: (settings: Settings) => void;
}

const CellShapeOptions = [
  { icon: QRPattern1Icon, value: CellShape.Square },
  { icon: QRPattern2Icon, value: CellShape.RoundedSquareSlight },
  { icon: QRPattern3Icon, value: CellShape.RoundedSquareFull },
  { icon: QRPattern4Icon, value: CellShape.Circle },
  { icon: QRPattern5Icon, value: CellShape.RoundedTopLeftBottomRight },
  { icon: QRPattern6Icon, value: CellShape.RoundedTopRightBottomLeft },
  { icon: QRPattern7Icon, value: CellShape.HorizontalLines },
  { icon: QRPattern8Icon, value: CellShape.VerticalLines },
];

const EyeShapeOptions = [
  { icon: QREyePattern1Icon, value: EyeShape.Square },
  { icon: QREyePattern2Icon, value: EyeShape.RoundedSquare },
  { icon: QREyePattern3Icon, value: EyeShape.Circle },
  { icon: QREyePattern4Icon, value: EyeShape.Drop },
];

const StyleSettings: React.FC<Props> = ({ settings, setSettings }) => {
  const isValidContrast = useMemo<boolean>(() => {
    return calculateContrast(settings.foregroundColor, settings.backgroundColor) > 4.5;
  }, [settings.foregroundColor, settings.backgroundColor]);

  const onUpdate = (newSettings: Partial<Settings>) => {
    setSettings({
      ...settings,
      ...newSettings,
    });
  }

  return (
    <Container>
      <ColorsGrid>
        <div>
          <FieldContainer>
            <Label>Elements Color</Label>

            <ColorInput
              value={settings.foregroundColor}
              onChange={(value) => onUpdate({ foregroundColor: value })}
            />
          </FieldContainer>

          <FieldContainer>
            <Label>Background Color</Label>

            <ColorInput
              value={settings.backgroundColor}
              onChange={(value) => onUpdate({ backgroundColor: value })}
            />
          </FieldContainer>
        </div>

        <ExamplesGrid>
          {colorExamples.map((example, index) => (
            <Example
              key={index}
              $backgroundColor={example.backgroundColor}
              $foregroudndColor={example.foregroundColor}
              onClick={() => {
                onUpdate({
                  foregroundColor: example.foregroundColor,
                  backgroundColor: example.backgroundColor,
                });
              }}
            >
              <QRExampleIcon width='16' height='16' />
            </Example>
          ))}
        </ExamplesGrid>
      </ColorsGrid>

      {!isValidContrast && (
        <Warning>
          <WarningIcon width='24' height='24' />

          The contrast between the colors is too low.
        </Warning>
      )}

      <FieldContainer>
        <Label>Cell Shape</Label>

        <IconButtonGroup 
          options={CellShapeOptions} 
          value={settings.cellShape} 
          onChange={(value) => onUpdate({ cellShape: value as CellShape })}
        />
      </FieldContainer>

      <FieldContainer>
        <Label>Eye Shape</Label>

        <IconButtonGroup 
          options={EyeShapeOptions} 
          value={settings.eyeShape} 
          onChange={(value) => onUpdate({ eyeShape: value as EyeShape })}
        />
      </FieldContainer>
    </Container>
  );
};

const Container = styled.div`
`;

const FieldContainer = styled.div`
  margin-bottom: 1rem;
`;

const ColorsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
  align-items: center;
`;

const ExamplesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0.5rem;
  width: fit-content;
  height: fit-content;
`;

const Example = styled.div<{ $foregroudndColor: string, $backgroundColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  padding: 0.25rem;
  border: 0.0625rem solid var(--surface-border);
  border-radius: 0.25rem;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  cursor: pointer;

  .icon {
    path, circle {
      fill: ${({ $foregroudndColor }) => $foregroudndColor};
    }
  }
`;

const Warning = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;

  .icon {
    min-width: 1.5rem;

    path {
      fill: var(--yellow-500);
    }
  }
`;

export { StyleSettings };
