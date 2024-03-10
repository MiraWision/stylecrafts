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
}

const ThemeSwitcher: Theme[] = [
  { name: 'amber', dark: 'lara-dark-amber', light: 'lara-light-amber' },
  { name: 'blue', dark: 'lara-dark-blue', light: 'lara-light-blue' },
  { name: 'cyan', dark: 'lara-dark-cyan', light: 'lara-light-cyan' },
  { name: 'green', dark: 'lara-dark-green', light: 'lara-light-green' },
  { name: 'indigo', dark: 'lara-dark-indigo', light: 'lara-light-indigo' },
  { name: 'pink', dark: 'lara-dark-pink', light: 'lara-light-pink' },
  { name: 'purple', dark: 'lara-dark-purple', light: 'lara-light-purple' },
  { name: 'teal', dark: 'lara-dark-teal', light: 'lara-light-teal' },
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
          {ThemeSwitcher.map((themeOption, index) => (
            <ChooseThemeContainer key={themeOption.name}>
              <ThemeButton
                onClick={() => changeTheme(themeOption.name)}
                color={index === 0 ? 'orange' : themeOption.name}
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
  top: 1rem;
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
  border: 1px solid rgba(255, 255, 255, 0.5); // Светлая граница для эффекта "стекла"
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2); // Полупрозрачный белый фон
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(2px); // Увеличенный эффект размытия для эффекта "стекла"
  -webkit-backdrop-filter: blur(2px); // То же самое для Safari
  overflow: hidden;
  animation: ${props => props.isOpen ? expandDown : collapseUp} 0.5s forwards;
`;

const ThemeName = styled.div`
  
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
