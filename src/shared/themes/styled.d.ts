import 'styled-components';
import { AuroraTheme, auroraTheme } from './aurora';

declare module 'styled-components' {
  export interface DefaultTheme {
    theme: AuroraTheme;
    currentMode: typeof auroraTheme.modes.dark | typeof auroraTheme.modes.light;
    isDark: boolean;
    
    // Backward compatibility properties - auto-populated
    colors: {
      primary: any;
      secondary: any;
      neutral: any;
      success: any;
      error: any;
      warning: any;
      info: any;
      background: any;
      surface: any;
      text: any;
      gradients: any;
    };
    typography: {
      fontFamily: any;
      fontSizes: any;
      fontWeights: any;
      lineHeights: any;
    };
    spacing: any;
    borderRadius: any;
    shadows: any;
    transitions: any;
    zIndex: any;
    breakpoints: any;
    rtl: any;
  }
}