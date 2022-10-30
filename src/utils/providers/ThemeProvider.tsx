import React, { useState, useEffect } from 'react';
import { ColorTheme } from '../types';
import { ThemeProviderProps } from '../types/props';
import ThemeContext from '../context/ThemeContext';
import { getInitialTheme } from '../helpers';

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  const setRawTheme = (rawTheme: ColorTheme) => {
    const root = window.document.documentElement;
    const isDark = rawTheme === 'dark';

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(rawTheme);

    localStorage.setItem('color-theme', rawTheme);
  };

  useEffect(() => {
    setRawTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
