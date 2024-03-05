import React, { useState } from 'react';
import styled from 'styled-components';
import useLocalStorage from '@/hooks/useLocalStorage/useLocalStorage';
import { Button } from 'primereact/button';
import themeStorageHandler from '@/hooks/useLocalStorage/theme-handler';

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
    <ThemeContainer>
      <Button icon={icon} onClick={toggleThemeSelector} className="p-button-rounded" />
      {isThemeSelectorOpen && (
        <ThemeSelector>
          {ThemeSwitcher.map((themeOption) => (
            <ThemeButton
              key={themeOption.name}
              onClick={() => changeTheme(themeOption.name)}
              color={themeOption.name}
            >
              {themeOption.name}
            </ThemeButton>
          ))}
        </ThemeSelector>
      )}
    </ThemeContainer>
  );
};

const ThemeContainer = styled.div`
  position: fixed;
  top: 1rem;
  right: 5rem;
  z-index: 1000;
`;

const ThemeButton = styled.button<{ color: string }>`
  background-color: ${(props) => props.color};
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    opacity: 0.8;
  }
`;

const ThemeSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
`;

export { SelectTheme };
