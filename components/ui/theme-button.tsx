import React, { useEffect, useMemo, useState } from 'react';
import { Button } from 'primereact/button';
import styled from 'styled-components';

import { MoonIcon } from '@/components/icons/moon';
import { SunIcon } from '@/components/icons/sun';

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
    return theme === Theme.Light ? 'moon' : 'sun';
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light);
  }

  return isClient && (
    <Container>
      <ButtonStyled 
        onClick={toggleTheme} 
        className='p-button-rounded'
      >
        {icon === 'moon' ? (
          <MoonIcon />
        ) : (
          <SunIcon />
        )}
      </ButtonStyled>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  z-index: 1000;

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    left: auto;
    bottom: auto;
  }
`;

const ButtonStyled = styled(Button)`
  padding: 0.25rem;
  background-color: var(--surface-50);
  border: 0.0625rem dashed var(--surface-500);

  .icon * {
    stroke: var(--surface-500);
  }

  @media (max-width: 768px) {
    width: 2rem;
    height: 2rem;

    > .p-button-icon {
      font-size: 0.75rem;
    }
  }
`;

export { ThemeButton };
