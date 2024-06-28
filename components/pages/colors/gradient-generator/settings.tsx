import React, { useState } from 'react';
import styled from 'styled-components';

import { GAService } from '@/services/google-analytics-service';
import { analyticsEvents } from '@/services/google-analytics-service/analytics-events';
import { copyToClipboard } from '@/utils/copy';
import { Gradient } from './gradient-examples';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { TwoColumnsContainer } from '@/components/ui/containers';
import { Label } from '@/components/ui/texts/label';
import { ColorInput } from '@/components/ui/inputs/color-input';
import { RemoveButton } from '@/components/ui/buttons/remove-button';
import { StepNumberInput } from '@/components/ui/inputs/step-number-input';
import { PrimaryButton } from '@/components/ui/buttons/primary-button';
import { ColorsOutput } from './colors-output';
import { useToast } from '@/components/ui/toast';

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

  const copyAll = () => {
    const text = JSON.stringify(gradient).replace(/,/g, ', ');

    copyToClipboard(text, {
      onSuccess: () => {
        toast.success('Colors copied to clipboard', text);

        GAService.logEvent(analyticsEvents.colors.gradient.gradientCopied(text));
      },
    });
  };
  
  return (
    <Container>
      <Header>
        <ToggleContainer onClick={() => setIsOpen(!isOpen)}>
          Adjust Colors

          <Icon icon={faChevronDown} isOpen={isOpen} />
        </ToggleContainer>

        <PrimaryButton icon='pi pi-copy' onClick={copyAll}>
          Copy Colors
        </PrimaryButton>
      </Header>
      
      <SettingsContainer isOpen={isOpen}>
        <FormColumn>
          {gradientSettings.map((item, index) => {
            const colorIndex = Math.floor(index / 2);

            const type = index % 2 === 0 ? 'color' : 'steps';

            if (type === 'color') {
              return (
                <Field>
                  <Label>Color {colorIndex + 1}</Label>

                  <ColorInputContainer>
                    <ColorInput
                      value={item as string}
                      onChange={(newColor) => onUpdateColor(colorIndex, newColor)}
                    />

                    <RemoveButton 
                      onClick={() => onRemoveColor(colorIndex)}
                      disabled={gradientSettings.length <= 3} 
                    />
                  </ColorInputContainer>
                </Field>
              )
            }

            return (
              <Field>
                <Label>Steps to Color {colorIndex + 2}</Label>

                <StepNumberInput
                  value={item as number}
                  onChange={(newSteps) => onUpdateSteps(colorIndex, newSteps)}
                  min={1}
                  max={25}
                  step={1}
                  showButtons
                />
              </Field>
            );
          })}

          <PrimaryButton icon='pi pi-plus' onClick={onAddColor}>
            Add Color
          </PrimaryButton>
        </FormColumn>

        <ResultsColumn>
          {gradient && (
            <ColorsOutput colors={gradient} />
          )}
        </ResultsColumn>
      </SettingsContainer>
    </Container>
  );
}

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
`;

const Icon = styled(FontAwesomeIcon)<{ isOpen: boolean }>`
  font-size: 0.75rem;
  margin-left: 0.5rem;
  transform: ${({ isOpen }) => isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.3s;
`;

const SettingsContainer = styled(TwoColumnsContainer)<{ isOpen: boolean }>`
  max-height: ${({ isOpen }) => isOpen ? '50rem' : '0'};
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  margin: 0;

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