import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { auroraTheme, AuroraTheme } from './aurora';

interface ThemeContextType {
  theme: AuroraTheme;
  currentMode: typeof auroraTheme.modes.dark | typeof auroraTheme.modes.light;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(true); // Default to dark Aurora theme

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = auroraTheme;
  const currentMode = isDark ? auroraTheme.modes.dark : auroraTheme.modes.light;

  const value: ThemeContextType = {
    theme,
    currentMode,
    isDark,
    toggleTheme,
  };

  // Create styled-components theme object with backward compatibility
  const styledTheme = {
    theme,
    currentMode,
    isDark,
    
    // Backward compatibility - auto-map old theme structure
    colors: {
      primary: theme.modes.dark.palette?.brand || {},
      secondary: theme.modes.dark.palette?.accent || {},
      neutral: theme.modes.dark.palette?.neutral || {},
      success: theme.modes.dark.palette?.success || {},
      error: theme.modes.dark.palette?.error || {},
      warning: theme.modes.dark.palette?.warning || {},
      info: theme.modes.dark.palette?.info || {},
      background: currentMode.color.background,
      surface: currentMode.color.surface,
      text: currentMode.color.text,
      gradients: currentMode.color.gradients,
    },
    typography: {
      fontFamily: theme.typography.fontFamily,
      fontSizes: theme.typography.sizes,
      fontWeights: theme.typography.weights,
      lineHeights: theme.typography.lineHeights,
    },
    spacing: theme.spacing,
    borderRadius: theme.radii,
    shadows: theme.shadows,
    transitions: {
      fast: theme.motion.durations.fast + ' ' + theme.motion.easings.standard,
      normal: theme.motion.durations.normal + ' ' + theme.motion.easings.standard,
      slow: theme.motion.durations.slow + ' ' + theme.motion.easings.standard,
      bounce: theme.motion.durations.normal + ' ' + theme.motion.easings.bounce,
    },
    zIndex: theme.zIndex,
    breakpoints: theme.breakpoints,
    rtl: theme.rtl,
  };

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={styledTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
