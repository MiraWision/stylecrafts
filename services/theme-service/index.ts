import { Observer } from '@/tools/observer';
import { Theme } from './types';

class ThemeService extends Observer<Theme> {
  private theme: Theme = Theme.Light;

  constructor() {
    super();

    this.setTheme(this.getThemeFromLocalStorage() || this.getDefaultTheme());
  }
  
  public getTheme(): Theme {
    return this.theme;
  }

  public setTheme(theme: Theme): void {
    this.theme = theme;

    this.updateThemeLink(theme);

    this.setThemeToLocalStorage(theme);

    this.notify(theme);
  }

  private updateThemeLink(theme: Theme) {
    if (typeof window === 'undefined') {
      return;
    }

    const themeLink = document.getElementById('theme-link') as HTMLLinkElement | null;

    if (themeLink) {
      themeLink.href = `/styles/${theme}.css`;
    }
  }

  private getDefaultTheme(): Theme {
    if (typeof window === 'undefined') {
      return Theme.Light;
    }

    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const theme = userPrefersDark ? Theme.Dark : Theme.Light;

    return theme;
  }

  private getThemeFromLocalStorage(): Theme | null {
    if (typeof window === 'undefined') {
      return null;
    }

    const theme = localStorage?.getItem('theme');

    if (!theme) {
      return null;
    }

    return theme === Theme.Dark ? Theme.Dark : Theme.Light;
  }

  private setThemeToLocalStorage(theme: Theme): void {
    if (typeof window === 'undefined') {
      return;
    }

    localStorage?.setItem('theme', theme);
  }
}

const ThemeServiceInstance = new ThemeService();

export { ThemeServiceInstance as ThemeService };
