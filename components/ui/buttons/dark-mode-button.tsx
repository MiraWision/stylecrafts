import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import styled from 'styled-components';
import useLocalStorage from '@/hooks/useLocalStorage/useLocalStorage';
import themeStorageHandler from '@/hooks/useLocalStorage/theme-handler';

interface DarkModeButtonProps {
  setTheme: (value: string) => void;
}

const DarkModeButton: React.FC<DarkModeButtonProps> = ({ setTheme: setGlobalTheme }) => {
  const [theme, { set: setLocalStorageTheme }] = useLocalStorage(themeStorageHandler);

  useEffect(() => {
    if (theme) {
      updateThemeLink(theme);
    }
  }, [theme]);

  const updateThemeLink = (themeName: string) => {
    const themeLink = document.getElementById('theme-link') as HTMLLinkElement | null;
    if (themeLink) {
      themeLink.href = `/themes/${themeName}/theme.css`;
    }
  };

  const toggleTheme = () => {
    if (theme) {
      const themeParts = theme.split('-');
      const themeMode = themeParts[1]; 
      const color = themeParts.slice(2).join('-');

      const newThemeMode = themeMode === 'dark' ? 'light' : 'dark';
      const newTheme = `lara-${newThemeMode}-${color}`;
      setLocalStorageTheme(newTheme);
      setGlobalTheme(newTheme);
    }
  };

  const icon = theme?.includes('light') ? 'pi pi-sun' : 'pi pi-moon';

  return (
    <ThemeSwitcherContainer>
      <Button icon={icon} onClick={toggleTheme} className="p-button-rounded" />
    </ThemeSwitcherContainer>
  );
};

const ThemeSwitcherContainer = styled.div`
  position: fixed;
  top: 1.5rem;
  right: 1rem;
  z-index: 1000;
`;

export { DarkModeButton };
