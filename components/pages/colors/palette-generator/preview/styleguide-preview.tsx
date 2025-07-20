import React from 'react';
import styled from 'styled-components';
import { PaletteColor } from '../types';
import { RoundCheckbox } from '@/components/ui/round-checkbox';

interface StyleguidePreviewProps {
  palette: PaletteColor[];
}

const StyleguidePreview: React.FC<StyleguidePreviewProps> = ({ palette }) => {
  const primaryColor = palette.find(c => c.title === 'Primary')?.baseColor || '#6a4df6';
  const accentColor = palette.find(c => c.title === 'Accent')?.baseColor || '#e74c3c';
  const textColor = palette.find(c => c.title === 'Text')?.baseColor || '#333333';

  return (
    <Container>
      <LeftColumn>
        <Section>
          <CompactHeading style={{ color: textColor }}>Buttons</CompactHeading>
          <ButtonGrid>
            {Array.from({ length: 15 }).map((_, i) => (
              <SquareButton
                key={i}
                variant={i % 3}
                primaryColor={primaryColor}
                accentColor={accentColor}
              >
                <span>Аа</span>
              </SquareButton>
            ))}
          </ButtonGrid>
        </Section>

        <Section>
          <CompactHeading style={{ color: textColor }}>Switches</CompactHeading>
          <SwitchGrid>

          <Switch color={primaryColor}>
              <input type="checkbox" id="switch1" defaultChecked />
              <label htmlFor="switch1">
                <SwitchSlider color={primaryColor} />
              </label>
              <span>Active</span>
            </Switch>

            <Switch color={primaryColor}>
              <input type="checkbox" id="switch2" />
              <label htmlFor="switch2">
                <SwitchSlider color={primaryColor} />
              </label>
              <span>Off</span>
            </Switch>

            <Switch color={primaryColor}>
              <input type="checkbox" id="switch3" disabled />
              <label htmlFor="switch3">
                <SwitchSlider color={primaryColor} />
              </label>
              <span>Disabled</span>
            </Switch>

            <Switch color={primaryColor}>
              <input type="checkbox" id="switch4" defaultChecked />
              <label htmlFor="switch4">
                <SwitchSlider color={primaryColor} data-theme-switch />
              </label>
              <span>Theme</span>
            </Switch>

          </SwitchGrid>
        </Section>
      </LeftColumn>

      <RightColumn>
        <Section>
          <CompactHeading style={{ color: textColor }}>Checkboxes</CompactHeading>
          <CheckboxGroup>
            <RoundCheckbox id="check1" label="Active" checked accentColor={primaryColor} />
            <RoundCheckbox id="check2" label="Hover" accentColor={primaryColor} />
            <RoundCheckbox id="check3" label="Default" accentColor={primaryColor} />
            <RoundCheckbox id="check4" label="Disabled" disabled accentColor={primaryColor} />
          </CheckboxGroup>
        </Section>

        <Section>
          <CompactHeading style={{ color: textColor }}>Progress Table</CompactHeading>
          <Table>
            <thead>
              <tr>
                <th>Brand</th>
                <th>Progress</th>
                <th>Users</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mailchimp</td>
                <td><ProgressBar progress={21} primaryColor={primaryColor} /></td>
                <td>Users...</td>
              </tr>
              <tr>
                <td>Rocket Chat</td>
                <td><ProgressBar progress={12} primaryColor={primaryColor} /></td>
                <td>Users...</td>
              </tr>
              <tr>
                <td>Evernote</td>
                <td><ProgressBar progress={25} primaryColor={primaryColor} /></td>
                <td>Users...</td>
              </tr>
              <tr>
                <td>Squarespace</td>
                <td><ProgressBar progress={73} primaryColor={primaryColor} /></td>
                <td>Users...</td>
              </tr>
              <tr>
                <td>Notion</td>
                <td><ProgressBar progress={55} primaryColor={primaryColor} /></td>
                <td>Users...</td>
              </tr>
            </tbody>
          </Table>
        </Section>
      </RightColumn>
    </Container>
  );
};

// SVG icons for theme switch
const sunSVG = `url('data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5" stroke="%23FFA500" stroke-width="2" fill="%23FFD700"/><g stroke="%23FFA500" stroke-width="2"><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/></g></svg>')`;
const moonSVG = `url('data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 0111.21 3c0 .34.02.67.05 1A7 7 0 1012 21a9 9 0 009-8.21z" fill="%23FFD700" stroke="%23FFA500" stroke-width="2"/></svg>')`;

const Container = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
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

const CompactHeading = styled.h2`
  font-size: 14px !important;
  font-weight: 600 !important;
  margin: 0 0 20px !important;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 3rem);
  grid-template-rows: repeat(3, 3rem);
  gap: 8px;
`;

const SquareButton = styled.button<{ variant: number; primaryColor: string; accentColor: string }>`
  width: 3rem;
  height: 3rem;
  background-color: ${({ variant, primaryColor }) =>
    variant === 0 ? primaryColor : variant === 1 ? 'transparent' : '#ccc'};
  color: ${({ variant, primaryColor }) => (variant === 1 ? primaryColor : '#fff')};
  border: ${({ variant, primaryColor }) =>
    variant === 1 ? `2px solid ${primaryColor}` : 'none'};
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  position: relative;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ variant, primaryColor }) =>
      variant === 0 ? '#583bd6' : variant === 1 ? '#f0f0ff' : '#999'};
  }
`;

const SwitchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 16px;
`;

const Switch = styled.div<{ color: string }>`
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

const SwitchSlider = styled.span<{ color: string }>`
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

  /* theme-switch: moon when OFF */
  &[data-theme-switch]::before {
    background-image: ${moonSVG};
  }

  /* checked (ON) track + move knob */
  input:checked + label & {
    background-color: ${({ color }) => color};
    border-color: ${({ color }) => color};
  }
  input:checked + label &::before {
    transform: translate(20px, -50%);
    border-color: ${({ color }) => color};
  }

  /* checked theme-switch: sun icon */
  input:checked + label &[data-theme-switch]::before {
    background-image: ${sunSVG};
  }

  /* disabled */
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

const Section = styled.div`
  background: #fff;
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
    border-bottom: 1px solid #eee;
    text-align: left;
    font-size: 12px;
  }
  th {
    font-weight: 600;
    color: #666;
  }
`;

const ProgressBar = styled.div<{ progress: number; primaryColor: string }>`
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 5px;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    width: ${({ progress }) => progress}%;
    height: 10px;
    background-color: ${({ primaryColor }) => primaryColor};
  }
`;

export { StyleguidePreview };
