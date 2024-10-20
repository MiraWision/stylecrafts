import React from 'react';
import styled from 'styled-components';
import { PaletteColor } from '../types';
import { RoundCheckbox } from '@/components/ui/round-checkbox';

interface StyleguidePreviewProps {
  palette: PaletteColor[];
}

const StyleguidePreview: React.FC<StyleguidePreviewProps> = ({ palette }) => {
  const primaryColor = palette.find(color => color.title === 'Primary')?.baseColor || '#6a4df6';
  const accentColor = palette.find(color => color.title === 'Accent')?.baseColor || '#e74c3c';
  const textColor = palette.find(color => color.title === 'Text')?.baseColor || '#333333';
  const backgroundColor = palette.find(color => color.title === 'Background')?.baseColor || '#f5f5f5';

  return (
    <Container>
      <LeftColumn>
        <Section>
          <CompactHeading style={{ color: textColor }}>Buttons</CompactHeading>
          <ButtonGrid>
            {Array.from({ length: 15 }).map((_, index) => (
              <SquareButton
                key={index}
                variant={index % 3}
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
              <input type="checkbox" id="switch1" checked />
              <label htmlFor="switch1">
                <SwitchSlider className="slider" color={primaryColor} />
              </label>
              <span>On</span>
            </Switch>
            <Switch color={primaryColor}>
              <input type="checkbox" id="switch2" />
              <label htmlFor="switch2">
                <SwitchSlider className="slider" color={primaryColor} />
              </label>
              <span>Off</span>
            </Switch>
            <Switch color={primaryColor}>
              <input type="checkbox" id="switch3" checked disabled />
              <label htmlFor="switch3">
                <SwitchSlider className="slider" color={primaryColor} />
              </label>
              <span>On disabled</span>
            </Switch>
            <Switch color={primaryColor}>
              <input type="checkbox" id="switch4" disabled />
              <label htmlFor="switch4">
                <SwitchSlider className="slider" color={primaryColor} />
              </label>
              <span>Off disabled</span>
            </Switch>
          </SwitchGrid>
        </Section>

      </LeftColumn>

      <RightColumn>
        <Section>
          <CompactHeading style={{ color: textColor }}>Checkboxes</CompactHeading>
          <CheckboxGroup>
            <RoundCheckbox id="check1" label="Active" checked accentColor={accentColor} />
            <RoundCheckbox id="check2" label="Hover" accentColor={accentColor} />
            <RoundCheckbox id="check3" label="Default" accentColor={accentColor} />
            <RoundCheckbox id="check4" label="Disabled" disabled accentColor={accentColor} />
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
            </tbody>
          </Table>
        </Section>
      </RightColumn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 10px;
  padding: 20px;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%;
`;

const Section = styled.div<{ backgroundColor?: string }>`
  background: ${({ backgroundColor }) => backgroundColor || '#fff'};
  padding: 0 20px 10px 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const CompactHeading = styled.h2`
  font-size: 16px;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 3rem);
  grid-template-rows: repeat(3, 3rem);
  gap: 10px;
`;

const SquareButton = styled.button<{ variant: number, primaryColor: string, accentColor: string }>`
  width: 3rem;
  height: 3rem;
  background-color: ${({ variant, primaryColor, accentColor }) =>
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

  small {
    font-size: 0.6rem;
    position: absolute;
    bottom: 2px;
    right: 2px;
  }
`;

const SwitchGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const Switch = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    display: none;
  }

  label {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
  }

  input:checked + label .slider {
    background-color: ${({ color }) => color};
  }

  input:disabled + label .slider {
    background-color: #ccc;
  }

  input:checked + label .slider:before {
    transform: translateX(20px);
  }

  input:disabled:checked + label .slider:before {
    background-color: #fff;
  }
`;

const SwitchSlider = styled.span<{ color: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ color }) => color};
  border-radius: 34px;
  transition: 0.4s;

  &::before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    border-radius: 50%;
    transition: 0.4s;
  }
`;


const CheckboxGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }
`;

const ProgressBar = styled.div<{ progress: number, primaryColor: string }>`
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
