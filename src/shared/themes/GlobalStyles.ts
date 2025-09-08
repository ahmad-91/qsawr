import { createGlobalStyle } from 'styled-components';
import { auroraTheme } from './aurora';

const theme = auroraTheme.modes.dark; // Using dark mode as default

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    direction: ${auroraTheme.direction};
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${auroraTheme.typography.fontFamily.primary};
    font-size: ${auroraTheme.typography.sizes.base};
    font-weight: ${auroraTheme.typography.weights.normal};
    line-height: ${auroraTheme.typography.lineHeights.normal};
    color: ${theme.color.text.primary};
    background: ${theme.color.gradients.primary};
    min-height: 100vh;
    overflow-x: hidden;
    font-variant-numeric: ${auroraTheme.typography.features?.css?.fontVariantNumeric || 'normal'};
    position: relative;
    
    /* طبقة تهدئة لتقليل اللمعان والbanding */
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${theme.color.gradients.overlay};
      pointer-events: none;
      z-index: -1;
    }
  }

  /* Typography (محسن للتباين) */
  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 ${auroraTheme.spacing.md} 0;
    font-weight: ${auroraTheme.typography.weights.semibold};
    line-height: ${auroraTheme.typography.lineHeights.tight};
    color: ${theme.color.text.heading}; // محسن للتباين
  }

  h1 { font-size: ${auroraTheme.typography.sizes['4xl']}; }
  h2 { font-size: ${auroraTheme.typography.sizes['3xl']}; }
  h3 { font-size: ${auroraTheme.typography.sizes['2xl']}; }
  h4 { font-size: ${auroraTheme.typography.sizes.xl}; }
  h5 { font-size: ${auroraTheme.typography.sizes.lg}; }
  h6 { font-size: ${auroraTheme.typography.sizes.base}; }

  p {
    margin: 0 0 ${auroraTheme.spacing.md} 0;
    line-height: ${auroraTheme.typography.lineHeights.relaxed};
    color: ${theme.color.text.secondary}; // محسن للتباين
  }

  a {
    color: ${theme.color.accent.default};
    text-decoration: none;
    transition: color ${auroraTheme.motion.durations.fast} ${auroraTheme.motion.easings.standard};
    
    &:hover {
      color: ${theme.color.accent.hover};
    }
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.color.background.secondary};
    border-radius: ${auroraTheme.radii.full};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.color.surface.border};
    border-radius: ${auroraTheme.radii.full};
    transition: background ${auroraTheme.motion.durations.fast} ${auroraTheme.motion.easings.standard};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.color.surface.elevated};
  }

  /* Selection */
  ::selection {
    background: ${theme.color.brand.subtle};
    color: ${theme.color.text.primary};
  }

  ::-moz-selection {
    background: ${theme.color.brand.subtle};
    color: ${theme.color.text.primary};
  }

  /* Focus Styles */
  *:focus {
    outline: none;
    box-shadow: ${theme.color.states.focusRing};
  }

  /* Button Reset */
  button {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
  }

  /* Input Reset */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    border: none;
    outline: none;
    background: none;
  }

  /* List Reset */
  ul, ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* Image */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Table */
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    padding: ${auroraTheme.spacing.sm} ${auroraTheme.spacing.md};
    text-align: right;
    border-bottom: ${auroraTheme.borderWidth.hairline} solid ${theme.color.surface.divider};
  }

  th {
    font-weight: ${auroraTheme.typography.weights.semibold};
    color: ${theme.color.text.primary};
  }

  /* Code */
  code {
    font-family: ${auroraTheme.typography.fontFamily.mono};
    background: ${theme.color.surface[1]};
    padding: ${auroraTheme.spacing.xs} ${auroraTheme.spacing.sm};
    border-radius: ${auroraTheme.radii.sm};
    color: ${theme.color.text.secondary};
    font-size: 0.875em;
  }

  pre {
    background: ${theme.color.surface[1]};
    padding: ${auroraTheme.spacing.md};
    border-radius: ${auroraTheme.radii.lg};
    overflow-x: auto;
    border: ${auroraTheme.borderWidth.hairline} solid ${theme.color.surface.border};
    
    code {
      background: none;
      padding: 0;
      border-radius: 0;
    }
  }

  /* Blockquote */
  blockquote {
    margin: ${auroraTheme.spacing.lg} 0;
    padding: ${auroraTheme.spacing.md} ${auroraTheme.spacing.lg};
    border-inline-start: 4px solid ${theme.color.brand.default};
    background: ${theme.color.surface[1]};
    border-radius: ${auroraTheme.radii.md};
    font-style: italic;
    color: ${theme.color.text.secondary};
  }

  /* Horizontal Rule */
  hr {
    border: none;
    height: 1px;
    background: ${theme.color.surface.divider};
    margin: ${auroraTheme.spacing.xl} 0;
  }

  /* Utility Classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .text-center { text-align: center; }
  .text-start { text-align: start; }
  .text-end { text-align: end; }

  .font-light { font-weight: ${auroraTheme.typography.weights.light}; }
  .font-normal { font-weight: ${auroraTheme.typography.weights.normal}; }
  .font-medium { font-weight: ${auroraTheme.typography.weights.medium}; }
  .font-semibold { font-weight: ${auroraTheme.typography.weights.semibold}; }
  .font-bold { font-weight: ${auroraTheme.typography.weights.bold}; }

  /* RTL Support */
  [dir="rtl"] {
    text-align: right;
  }

  [dir="ltr"] {
    text-align: left;
  }

  /* Card Components - تصميم موحد للبطاقات */
  .card, [data-card] {
    background: ${theme.color.surface.card};
    border: 1px solid ${theme.color.surface.cardBorder};
    border-radius: ${auroraTheme.radii.xl};
    box-shadow: ${auroraTheme.shadows.sm};
    backdrop-filter: blur(8px);
    transition: all ${auroraTheme.motion.durations.normal} ${auroraTheme.motion.easings.standard};
    
    &:hover {
      box-shadow: ${auroraTheme.shadows.md};
      transform: translateY(-1px);
    }
  }

  /* Button Components - تحسين التباين */
  .btn-primary {
    background: ${theme.color.gradients.button};
    color: ${theme.color.text.onBrand};
    border: none;
    border-radius: ${auroraTheme.radii.lg};
    box-shadow: ${auroraTheme.shadows.sm};
    transition: all ${auroraTheme.motion.durations.fast} ${auroraTheme.motion.easings.standard};
    
    &:hover {
      box-shadow: ${auroraTheme.shadows.md};
      transform: translateY(-1px);
    }
    
    &:focus {
      box-shadow: ${theme.color.states.focusRing};
    }
  }

  /* Input Components - تحسين التباين */
  .form-input {
    background: ${theme.color.surface[1]};
    border: 1px solid ${theme.color.surface.border};
    color: ${theme.color.text.primary};
    border-radius: ${auroraTheme.radii.lg};
    
    &::placeholder {
      color: ${theme.color.text.muted};
    }
    
    &:focus {
      border-color: ${theme.color.accent.default};
      box-shadow: ${theme.color.states.focusRing};
    }
  }

  /* Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;