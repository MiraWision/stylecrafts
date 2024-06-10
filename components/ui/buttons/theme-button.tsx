import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import styled from 'styled-components';

import { useTheme } from '@/services/theme-service/use-theme';
import { Theme } from '@/services/theme-service/types';

interface Props {
}

const ThemeButton: React.FC<Props> = () => {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light);
  }

  return (
    <Container>
      <Button 
        icon={theme === Theme.Light ? 'pi pi-sun' : 'pi pi-moon'} 
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
