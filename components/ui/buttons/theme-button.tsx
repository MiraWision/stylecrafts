import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import styled from 'styled-components';
import useLocalStorage from '@/hooks/useLocalStorage/useLocalStorage';
import themeStorageHandler from '@/hooks/useLocalStorage/theme-handler';

interface Props {
  setTheme: (value: string) => void;
}

const ThemeButton: React.FC<Props> = ({ setTheme: setGlobalTheme }) => {
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

  return (
    <Container>
      <Button 
        icon={theme === 'light' ? 'pi pi-sun' : 'pi pi-moon'} 
        onClick={toggleTheme} 
        className='p-button-rounded'
      />
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 1.5rem;
  right: 1rem;
  z-index: 1000;
`;

export { ThemeButton };
