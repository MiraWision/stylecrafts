import React from 'react';
import styled from 'styled-components';
import { adjustBrightness } from '@mirawision/colorize';

import { PaletteColor } from '../types';

import { RoundCheckbox } from '@/components/ui/round-checkbox';
import { QRCodeGeneratorIcon } from '@/components/icons/qr-code-generator';
import { ColorInspectorIcon } from '@/components/icons/color-inspector';

interface StyleguidePreviewProps {
  palette: PaletteColor[];
}

const StyleguidePreview: React.FC<StyleguidePreviewProps> = ({ palette }) => {
  const primary = palette.find(c => c.title === 'Primary')?.baseColor ?? '#3468db';
  const accent = palette.find(c => c.title === 'Accent')?.baseColor  ?? '#e74c3c';
  const text = palette.find(c => c.title === 'Text')?.baseColor    ?? '#333333';
  const background = palette.find(c => c.title === 'Background')?.baseColor ?? '#f5f5f5';
  
  const primaryLight = adjustBrightness(primary, 10);
  const backgroundDark = adjustBrightness(background, -5);

  return (
    <Container $backgroundColor={background}>
      <LeftColumn>
        <Section $backgroundColor={backgroundDark}>
          <CompactHeading $color="white">Buttons</CompactHeading>
          <ButtonContainer>
            <PrimaryButton type="submit" $backgroundColor={primary} $hoverBackgroundColor={primaryLight}>
              <QRCodeGeneratorIcon width="16" height="16" />
              Generate QR Code
            </PrimaryButton>
            <SecondaryButton type="button" $borderColor={primary} $color={primary} $hoverColor={primaryLight}>
              <ColorInspectorIcon width="16" height="16" />
              Inspect Color
            </SecondaryButton>
          </ButtonContainer>
        </Section>

        <Section $backgroundColor={backgroundDark}>
          <CompactHeading $color="white">Switches</CompactHeading>
          <SwitchGrid>

          <Switch $color={primary}>
              <input type="checkbox" id="switch1" defaultChecked />
              <label htmlFor="switch1">
                <SwitchSlider $color={primary} />
              </label>
              <span>Active</span>
            </Switch>

            <Switch $color={primary}>
              <input type="checkbox" id="switch2" />
              <label htmlFor="switch2">
                <SwitchSlider $color={primary} />
              </label>
              <span>Off</span>
            </Switch>

            <Switch $color={primary}>
              <input type="checkbox" id="switch3" disabled />
              <label htmlFor="switch3">
                <SwitchSlider $color={primary} />
              </label>
              <span>Disabled</span>
            </Switch>

            <Switch $color={primary}>
              <input type="checkbox" id="switch4" defaultChecked />
              <label htmlFor="switch4">
                <SwitchSlider $color={primary} data-theme-switch />
              </label>
              <span>Theme</span>
            </Switch>

          </SwitchGrid>
        </Section>

        <Section $backgroundColor={backgroundDark}>
          <CompactHeading $color="white">Radio Buttons</CompactHeading>
          <CheckboxGroup>
            <RoundCheckbox id="radio1" label="Active" checked accentColor={primary} />
            <RoundCheckbox id="radio3" label="Default" accentColor={primaryLight} />
          </CheckboxGroup>
        </Section>
      </LeftColumn>

      <RightColumn>
        <Section $backgroundColor={backgroundDark}>
          <CompactHeading $color="white">Progress Table</CompactHeading>
          <Table>
            <thead>
              <tr>
                <th>Brand</th>
                <th>Progress</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mailchimp</td>
                <td><ProgressBar $progress={21} $primaryColor={primary} /></td>
                <td>150</td>
              </tr>
              <tr>
                <td>Rocket Chat</td>
                <td><ProgressBar $progress={12} $primaryColor={primary} /></td>
                <td>190</td>
              </tr>
              <tr>
                <td>Evernote</td>
                <td><ProgressBar $progress={25} $primaryColor={primary} /></td>
                <td>250</td>
              </tr>
              <tr>
                <td>Squarespace</td>
                <td><ProgressBar $progress={73} $primaryColor={primary} /></td>
                <td>350</td>
              </tr>
              <tr>
                <td>Notion</td>
                <td><ProgressBar $progress={55} $primaryColor={primary} /></td>
                <td>450</td>
              </tr>
            </tbody>
          </Table>
        </Section>
      </RightColumn>
    </Container>
  );
};

const Container = styled.div<{ $backgroundColor?: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: ${({ $backgroundColor }) => $backgroundColor || 'transparent'};
  border-radius: 0.5rem;
  min-height: 100%;
`;

const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CompactHeading = styled.h4<{ $color: string }>`
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.5px;
  color: ${({ $color }) => $color};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PrimaryButton = styled.button<{ $backgroundColor: string, $hoverBackgroundColor: string }>`
  display: flex;
  align-items: center;
  height: 2rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  color: var(--surface-0);
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: ${({ $backgroundColor }) => $backgroundColor};

  &:hover {
    background-color: ${({ $hoverBackgroundColor }) => $hoverBackgroundColor};
  }

  .icon {
    width: 1rem;
    height: 1rem;
    margin-right: 0.25rem;
    
    * {
      fill: var(--surface-0);
    }
  }
`;

const SecondaryButton = styled.button<{ $borderColor: string; $color: string; $hoverColor: string }>`
  height: 2rem;
  background-color: transparent;
  border: 1px solid;
  border-color: ${({ $borderColor }) => $borderColor};
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  color: ${({ $color }) => $color};

  .icon {
    width: 1rem;  
    height: 1rem;
    margin-right: 0.25rem;

    * {
      fill: ${({ $color }) => $color};
    }
  }

  &:hover {
    background-color: ${({ $hoverColor }) => $hoverColor};
    color: var(--surface-0);

    * {
      fill: var(--surface-0);
    }
  }
`;

const SwitchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 16px;
`;

const Switch = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;

  input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  label {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    cursor: pointer;
  }
`;

const SwitchSlider = styled.span<{ $color: string }>`
  position: absolute;
  inset: 0;
  background-color: #ccc;
  border: 2px solid #ccc;
  border-radius: 9999px;
  box-sizing: border-box;
  transition: background-color 0.3s, border-color 0.3s;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 2px;
    width: 16px;
    height: 16px;
    background-color: #fff;
    border: 2px solid #ccc;
    border-radius: 50%;
    transform: translateY(-50%);
    transition: transform 0.3s, background-image 0.3s, border-color 0.3s;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 14px;
  }

  input:checked + label & {
    background-color: ${({ $color }) => $color};
    border-color: ${({ $color }) => $color};
  }
  input:checked + label &::before {
    transform: translate(20px, -50%);
    border-color: ${({ $color }) => $color};
  }

  input:disabled + label & {
    background-color: #eee;
    border-color: #ddd;
    cursor: not-allowed;
  }
  input:disabled + label &::before {
    border-color: #ddd;
  }
  input:checked:disabled + label &::before {
    transform: translate(20px, -50%);
  }
`;

const Section = styled.div<{ $backgroundColor?: string }>`
  background: ${({ $backgroundColor }) => $backgroundColor};
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const CheckboxGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td {
    padding: 8px 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    text-align: left;
    font-size: 12px;
    color: white;
  }
  th {
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const ProgressBar = styled.div<{ $progress: number; $primaryColor: string }>`
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 5px;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    width: ${({ $progress }) => $progress}%;
    height: 10px;
    background-color: ${({ $primaryColor }) => $primaryColor};
  }
`;

export { StyleguidePreview };
