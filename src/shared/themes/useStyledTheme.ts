import { useTheme } from './ThemeContext';

// Helper hook that provides theme in the old format for backward compatibility
export const useStyledTheme = () => {
  const { theme, currentMode } = useTheme();
  
  return {
    // Colors - map to current mode
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
    
    // Typography
    typography: {
      fontFamily: theme.typography.fontFamily,
      fontSizes: theme.typography.sizes,
      fontWeights: theme.typography.weights,
      lineHeights: theme.typography.lineHeights,
    },
    
    // Layout
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
};

// Backwards compatibility function for styled-components
export const getStyledTheme = (themeContext: any) => {
  const currentMode = themeContext.currentMode || themeContext.theme?.modes?.dark;
  const theme = themeContext.theme;
  
  if (!theme || !currentMode) {
    // Fallback theme
    return {
      colors: {
        background: { primary: '#0f0f23' },
        surface: { border: 'rgba(148, 163, 184, 0.16)' },
        text: { primary: '#ffffff' },
        gradients: { primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      },
      typography: {
        fontSizes: { base: '1rem' },
        fontWeights: { normal: 400, medium: 500, semibold: 600 },
        lineHeights: { normal: 1.5 },
      },
      spacing: { md: '1rem', lg: '1.5rem', xl: '2rem' },
      borderRadius: { lg: '0.75rem' },
      shadows: { md: '0 4px 10px rgba(0,0,0,.16)' },
      transitions: { normal: '240ms cubic-bezier(.2,.8,.2,1)' },
    };
  }
  
  return {
    colors: {
      primary: theme.modes.dark.palette?.brand || {},
      secondary: theme.modes.dark.palette?.accent || {},
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
    },
    zIndex: theme.zIndex,
    breakpoints: theme.breakpoints,
  };
};
