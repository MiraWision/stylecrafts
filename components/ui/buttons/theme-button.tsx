import React, { use, useEffect, useMemo, useState } from 'react';
import { Button } from 'primereact/button';
import styled from 'styled-components';

import { useTheme } from '@/services/theme-service/use-theme';
import { Theme } from '@/services/theme-service/types';

interface Props {
}

const ThemeButton: React.FC<Props> = () => {
  const [theme, setTheme] = useTheme();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const icon = useMemo(() => {
    return theme === Theme.Light ? 'pi pi-sun' : 'pi pi-moon';
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light);
  }

  return isClient && (
    <Container>
      <ButtonStyled 
        icon={icon} 
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

const ButtonStyled = styled(Button)`
  color: var(--primary-color);
  background-color: var(--surface-50);
`;

export { ThemeButton };
