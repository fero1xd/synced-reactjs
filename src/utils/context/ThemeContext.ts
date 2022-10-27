import { createContext } from 'react';
import { ColorTheme } from '../types';

type ThemeContextType = {
  theme: ColorTheme;
  setTheme: React.Dispatch<React.SetStateAction<ColorTheme>>;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => {},
});

export default ThemeContext;
