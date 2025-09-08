// Utility functions to help with theme migration
// This provides fallbacks for components that haven't been updated yet

export const getThemeValue = (theme: any, path: string, fallback: any = undefined) => {
  try {
    const newThemePath = path
      .replace('colors.', 'currentMode.color.')
      .replace('typography.fontSizes', 'theme.typography.sizes')
      .replace('typography.fontWeights', 'theme.typography.weights')
      .replace('typography.lineHeights', 'theme.typography.lineHeights')
      .replace('spacing.', 'theme.spacing.')
      .replace('borderRadius.', 'theme.radii.')
      .replace('shadows.', 'theme.shadows.')
      .replace('transitions.', 'theme.motion.durations.');

    const pathParts = newThemePath.split('.');
    let value = theme;
    
    for (const part of pathParts) {
      value = value?.[part];
      if (value === undefined) break;
    }
    
    return value !== undefined ? value : fallback;
  } catch (error) {
    return fallback;
  }
};

// Legacy theme compatibility - provides old theme structure as fallback
export const getLegacyTheme = (theme: any) => {
  if (!theme?.currentMode) {
    return {
      colors: {
        text: { primary: '#ffffff', secondary: '#e2e8f0' },
        background: { primary: '#0f0f23' },
        surface: { border: 'rgba(148, 163, 184, 0.16)' },
        gradients: { primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }
      },
      typography: {
        fontSizes: { base: '1rem', xl: '1.25rem' },
        fontWeights: { normal: 400, medium: 500, semibold: 600 },
        lineHeights: { normal: 1.5, relaxed: 1.75 }
      },
      spacing: { md: '1rem', lg: '1.5rem', xl: '2rem' },
      borderRadius: { lg: '0.75rem' },
      shadows: { md: '0 4px 10px rgba(0,0,0,.16)' }
    };
  }

  return {
    colors: {
      primary: theme.theme?.modes?.dark?.palette?.brand || {},
      secondary: theme.theme?.modes?.dark?.palette?.accent || {},
      text: theme.currentMode?.color?.text || {},
      background: theme.currentMode?.color?.background || {},
      surface: theme.currentMode?.color?.surface || {},
      gradients: theme.currentMode?.color?.gradients || {}
    },
    typography: {
      fontSizes: theme.theme?.typography?.sizes || {},
      fontWeights: theme.theme?.typography?.weights || {},
      lineHeights: theme.theme?.typography?.lineHeights || {}
    },
    spacing: theme.theme?.spacing || {},
    borderRadius: theme.theme?.radii || {},
    shadows: theme.theme?.shadows || {},
    transitions: {
      normal: (theme.theme?.motion?.durations?.normal || '240ms') + ' ' + (theme.theme?.motion?.easings?.standard || 'cubic-bezier(.2,.8,.2,1)')
    }
  };
};
