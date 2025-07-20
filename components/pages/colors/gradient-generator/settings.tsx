import React, { useState } from 'react';
import styled from 'styled-components';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';
import { Gradient } from './gradient-examples';

import { TwoColumnsContainer } from '@/components/ui/containers';
import { Label } from '@/components/ui/texts/label';
import { ColorInput } from '@/components/ui/inputs/color-input';
import { RemoveIconButton } from '@/components/ui/icon-buttons/remove-icon-button';
import { NumberInput } from '@/components/ui/inputs/number-input';
import { ColorsOutput } from './colors-output';
import { useToast } from '@/components/ui/toast';
import { AdjustIcon } from '@/components/icons/adjust';
import { CopyTextButton } from '@/components/ui/text-buttons/copy-text-button';
import { AddTextButton } from '@/components/ui/text-buttons/add-text-button';

interface Props {
  gradientSettings: Gradient['colors'];
  gradient: string[] | null;
  onAddColor: () => void;
  onRemoveColor: (index: number) => void;
  onUpdateColor: (index: number, color: string) => void;
  onUpdateSteps: (index: number, steps: number) => void;
}

const GradientSettings: React.FC<Props> = ({
  gradientSettings,
  gradient,
  onAddColor,
  onRemoveColor,
  onUpdateColor,
  onUpdateSteps,
}) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onCopy = () => {
    const text = JSON.stringify(gradient).replace(/,/g, ', ');
    toast.success('Colors copied to clipboard', text);
    GAService.logEvent(analyticsEvents.colors.gradient.gradientCopied(text));
  };

  return (
    <Container>
      <Header>
        <ToggleContainer onClick={() => setIsOpen(!isOpen)}>
          <AdjustIcon />
          Adjust Colors
        </ToggleContainer>

        {gradient && (
          <CopyTextButton
            text="Copy Colors"
            copyText={JSON.stringify(gradient).replace(/,/g, ', ')}
            onCopyCallback={onCopy}
          />
        )}
      </Header>

      <SettingsContainer $isOpen={isOpen}>
        <FormColumn>
          {gradientSettings.map((item, index) => {
            const colorIndex = Math.floor(index / 2);
            const type = index % 2 === 0 ? 'color' : 'steps';

            if (type === 'color') {
              return (
                <Field key={index}>
                  <Label>Color {colorIndex + 1}</Label>
                  <ColorInputContainer>
                    <ColorInput
                      value={item as string}
                      onChange={(newColor) => onUpdateColor(colorIndex, newColor)}
                    />
                    <RemoveIconButton
                      onClick={() => onRemoveColor(colorIndex)}
                      disabled={gradientSettings.length <= 3}
                    />
                  </ColorInputContainer>
                </Field>
              );
            }

            return (
              <Field key={index}>
                <Label>Steps to Color {colorIndex + 2}</Label>
                <NumberInput
                  value={item as number}
                  onChange={(newSteps) => onUpdateSteps(colorIndex, newSteps)}
                  min={1}
                  max={25}
                  step={1}
                />
              </Field>
            );
          })}

          <AddTextButton text="Add Color" onClick={onAddColor} />
        </FormColumn>

        <ResultsColumn>
          {gradient && <ColorsOutput colors={gradient} />}
        </ResultsColumn>
      </SettingsContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  margin: 2rem 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  cursor: pointer;

  .icon {
    margin-right: 0.5rem;

    * {
      fill: var(--text-color);
    }
  }
`;

const SettingsContainer = styled(TwoColumnsContainer).attrs<{ $isOpen: boolean }>(({ $isOpen }) => ({
  style: {
    maxHeight: $isOpen ? '50rem' : '0',
    paddingBottom: $isOpen ? '10rem' : '0',
    marginBottom: $isOpen ? '-10rem' : '0',
  },
}))`
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  width: calc(100% + 1rem);
  margin: -0.5rem -0.5rem -10rem;
  padding: 0.5rem 0.5rem 10rem;

  @media (max-width: 768px) {
    width: fit-content;
    gap: 1rem;
  }
`;

const Field = styled.div`
  margin-bottom: 1rem;
`;

const ColorInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResultsColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
`;

export { GradientSettings };
