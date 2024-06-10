import { useEffect, useState } from 'react';

import { ThemeService } from '.';
import { Theme } from './types';

type UseTheme = () => [Theme, (theme: Theme) => void];

const useTheme: UseTheme = () => {
  const [theme, setTheme] = useState<Theme>(ThemeService.getTheme());

  useEffect(() => {
    ThemeService.subscribe(setTheme);

    return () => {
      ThemeService.unsubscribe(setTheme);
    };
  });

  return [theme, ThemeService.setTheme];
};

export { useTheme };