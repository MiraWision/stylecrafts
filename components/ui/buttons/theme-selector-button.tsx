import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import useLocalStorage from '@/hooks/useLocalStorage/useLocalStorage';
import { Button } from 'primereact/button';
import themeStorageHandler from '@/hooks/useLocalStorage/theme-handler';
import { CSSTransition } from 'primereact/csstransition';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface Theme {
  name: string;
  dark: string;
  light: string;
  buttonColor: string;
}

const ThemeSwitcher: Theme[] = [
  { name: 'amber', dark: 'lara-dark-amber', light: 'lara-light-amber', buttonColor: '#fbbf24' }, 
  { name: 'blue', dark: 'lara-dark-blue', light: 'lara-light-blue', buttonColor: '#60a5fa' }, 
  { name: 'cyan', dark: 'lara-dark-cyan', light: 'lara-light-cyan', buttonColor: '#34d399' }, 
  { name: 'green', dark: 'lara-dark-green', light: 'lara-light-green', buttonColor: '#4CAF50' },
  { name: 'indigo', dark: 'lara-dark-indigo', light: 'lara-light-indigo', buttonColor: '#818cf8' }, 
  { name: 'pink', dark: 'lara-dark-pink', light: 'lara-light-pink', buttonColor: '#f472b6' }, 
  { name: 'purple', dark: 'lara-dark-purple', light: 'lara-light-purple', buttonColor: '#a78bfa' }, 
  { name: 'teal', dark: 'lara-dark-teal', light: 'lara-light-teal', buttonColor: '#2dd4bf' }, 
];

interface SelectThemeProps {
  darkMode: boolean;
  setTheme: (value: string) => void;
}

const SelectTheme: React.FC<SelectThemeProps> = ({ darkMode, setTheme: setGlobalTheme }) => {
  const [_, { set: setLocalStorageTheme }] = useLocalStorage(themeStorageHandler);
  const [icon, setIcon] = useState('pi pi-palette');
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);

  const changeTheme = (color: string) => {
    const newTheme = darkMode ? `lara-dark-${color}` : `lara-light-${color}`;
    setLocalStorageTheme(newTheme);
    setGlobalTheme(newTheme); 
  };
  
  const toggleThemeSelector = () => {
    setIsThemeSelectorOpen(!isThemeSelectorOpen);
  };

  return (
    <ThemeSelectorContainer>
      <Button icon={icon} onClick={toggleThemeSelector} className="p-button-rounded" />
      <CSSTransition in={isThemeSelectorOpen} timeout={300} classNames="theme-selector" unmountOnExit>
        <ThemeSelector isOpen={isThemeSelectorOpen}>
          {ThemeSwitcher.map((themeOption) => (
            <ChooseThemeContainer key={themeOption.name}>
              <ThemeButton
                onClick={() => changeTheme(themeOption.name)}
                color={themeOption.buttonColor}
              />
            </ChooseThemeContainer>
          ))}
        </ThemeSelector>
      </CSSTransition>
    </ThemeSelectorContainer>
  );
};

const ThemeSelectorContainer = styled.div`
  position: fixed;
  top: 1.5rem;
  right: 5rem;
  z-index: 1000;
`;

const ThemeButton = styled.button<{ color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  border: none;
  height: 40px;
  width: 40px;
  cursor: pointer;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);

  &:hover {
    opacity: 0.6;
    border: 0.3px solid white;
  }
`;

const ThemeSelector = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 3rem;
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin-top: 10px;
  border: 1px solid rgba(255, 255, 255, 0.5); 
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(2px); 
  -webkit-backdrop-filter: blur(2px);
  overflow: hidden;
  animation: ${props => props.isOpen ? expandDown : collapseUp} 0.5s forwards;
`;

const ChooseThemeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  &:not(:first-child) {
    margin-top: 10px; 
  }
`;

const expandDown = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 500px;
    opacity: 1;
  }
`;

const collapseUp = keyframes`
  from {
    max-height: 500px;
    opacity: 1;
  }
  to {
    max-height: 0;
    opacity: 0;
  }
`;

export { SelectTheme };
