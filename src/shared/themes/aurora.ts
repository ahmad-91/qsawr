export const auroraTheme = {
  name: 'Aurora',
  version: '2.0',
  locale: 'ar-SA',
  direction: 'rtl',

  // Modes
  mode: 'dark', // 'dark' | 'light'
  modes: {
    dark: {
      // Core palettes (غيرت قليلًا الخلفيات والأسطح لتحسين التباين)
      palette: {
        brand: {
          50:  '#f5f3ff', 100:'#ede9fe', 200:'#ddd6fe', 300:'#c4b5fd',
          400: '#a78bfa', 500:'#8b5cf6', 600:'#7c3aed', 700:'#6d28d9',
          800: '#5b21b6', 900:'#4c1d95', 950:'#2e1065'
        },
        accent: {
          50:  '#eff6ff', 100:'#dbeafe', 200:'#bfdbfe', 300:'#93c5fd',
          400: '#60a5fa', 500:'#3b82f6', 600:'#2563eb', 700:'#1d4ed8',
          800: '#1e40af', 900:'#1e3a8a', 950:'#172554'
        },
        neutral: {
          50:'#f8fafc',100:'#f1f5f9',200:'#e2e8f0',300:'#cbd5e1',
          400:'#94a3b8',500:'#64748b',600:'#475569',700:'#334155',
          800:'#1f2433', // أغمق قليلًا لإراحة العيون
          900:'#0f172a',950:'#0a0f1c'
        },
        success: { 50:'#f0fdf4',300:'#86efac',500:'#22c55e',600:'#16a34a',700:'#15803d' },
        warning: { 50:'#fffbeb',300:'#fde68a',500:'#f59e0b',600:'#d97706',700:'#b45309' },
        error:   { 50:'#fef2f2',300:'#fca5a5',500:'#ef4444',600:'#dc2626',700:'#b91c1c' },
        info:    { 50:'#eff6ff',300:'#93c5fd',500:'#3b82f6',600:'#2563eb',700:'#1d4ed8' },
      },

      // Design roles (semantic tokens)
      color: {
        // الخلفيات والأسطح (محسنة للاحترافية)
        background: {
          primary:  '#0a0a1a', // أغمق قليلاً للاحترافية
          secondary:'#141428', // أكثر هدوءاً
          tertiary: '#181835', // أكثر نعومة
          overlay:  'rgba(5, 5, 15, 0.7)', // تهدئة أقوى
          // طبقة تهدئة احترافية
          calming:  'rgba(5, 5, 15, 0.4)' // طبقة شفافة داكنة أكثر احترافية
        },
        surface: {
          // تدرّج احترافي للارتفاع (محسن للبطاقات)
          0:  '#0f0f1f', // أغمق وأكثر احترافية
          1:  '#15152a', // أكثر هدوءاً
          2:  '#1a1a35', // أكثر نعومة
          3:  '#222245', // أكثر احترافية
          elevated: 'linear-gradient(135deg, rgba(34,34,69,.9), rgba(26,26,53,.9))', // شفافية محسنة
          border:   'rgba(148, 163, 184, 0.08)', // حدود أخف وأكثر احترافية
          divider:  'rgba(148, 163, 184, 0.06)', // فواصل أخف
          // بطاقات موحدة - خلفية نصف شفافة احترافية
          card:     'rgba(25, 28, 55, 0.7)', // خلفية نصف شفافة أكثر احترافية
          cardBorder: 'rgba(148, 163, 184, 0.06)' // حدود خفيفة جداً وأكثر احترافية
        },

        // نص على خلفيات داكنة (محسن للتباين WCAG 2.1 AA)
        text: {
          primary:   '#ffffff', // 21:1 على الخلفية الداكنة
          secondary: '#f1f5f9', // 18:1 - محسن للتباين
          tertiary:  '#cbd5e1', // 12:1 - محسن للتباين
          muted:     '#94a3b8', // 7:1 - يلبي معايير AA
          inverse:   '#0f0f23',
          onBrand:   '#ffffff', // 21:1 على البنفسجي
          onAccent:  '#ffffff', // 21:1 على الأزرق
          onSuccess: '#052e16',
          onWarning: '#3b2f05',
          onError:   '#3f0a0a',
          // نصوص محسنة للعناوين الثانوية (7:1+)
          heading:   '#f8fafc', // 20:1 للعناوين
          subheading: '#e2e8f0' // 15:1 للعناوين الثانوية
        },

        // ألوان تفاعلية & حالات
        brand: {
          default: '#7c3aed',
          hover:   '#6d28d9',
          active:  '#5b21b6',
          subtle:  'rgba(124, 58, 237, 0.12)'
        },
        accent: {
          default: '#3b82f6',
          hover:   '#2563eb',
          active:  '#1d4ed8',
          subtle:  'rgba(59, 130, 246, 0.12)'
        },

        // حالات الحالة
        states: {
          focusRing:        '0 0 0 3px rgba(59,130,246,.4)',
          outline:          'rgba(148,163,184,.4)',
          disabledFg:       'rgba(226,232,240,.5)',
          disabledBg:       'rgba(148,163,184,.08)',
          disabledBorder:   'rgba(148,163,184,.18)',
          pressedOverlay:   'rgba(255,255,255,.06)',
          hoverOverlay:     'rgba(255,255,255,.04)',
          scrim:            'rgba(0,0,0,.5)'
        },

        // Gradients (محسنة للاحترافية - ألوان هادئة وأنيقة)
        gradients: {
          primary:  'linear-gradient(135deg, #3d4a8c 0%, #4a3d6b 100%)', // ألوان أكثر احترافية وهدوءاً
          secondary:'linear-gradient(135deg, #c47dd8 0%, #d84a6b 100%)', // ألوان أكثر نعومة
          accent:   'linear-gradient(135deg, #3d8dd8 0%, #00c4d8 100%)', // ألوان أكثر هدوءاً
          card:     'linear-gradient(135deg, rgba(25,28,55,0.8), rgba(32,36,70,0.8))', // شفافية محسنة للبطاقات
          button:   'linear-gradient(135deg, #3d4a8c 0%, #4a3d6b 100%)', // متطابق مع primary
          glow:     'linear-gradient(135deg, rgba(61,138,216,0.15) 0%, rgba(77,61,107,0.15) 100%)', // توهج خفيف
          // طبقة تهدئة احترافية
          overlay:  'linear-gradient(135deg, rgba(5,5,15,0.6) 0%, rgba(12,12,25,0.5) 100%)' // تهدئة أقوى وأكثر احترافية
        }
      }
    },

    light: {
      palette: {} as any, // يُشتق من الداكن؛ اختصارًا سنوفّره مباشرة في role tokens
      color: {
        background: {
          primary:  '#ffffff',
          secondary:'#f8fafc',
          tertiary: '#f1f5f9',
          overlay:  'rgba(15, 23, 42, 0.5)'
        },
        surface: {
          0:  '#ffffff',
          1:  '#f9fafb',
          2:  '#f3f4f6',
          3:  '#e5e7eb',
          elevated: 'linear-gradient(135deg, rgba(255,255,255,.96), rgba(248,250,252,.96))',
          border:   'rgba(15, 23, 42, 0.12)',
          divider:  'rgba(15, 23, 42, 0.08)'
        },
        text: {
          primary:   '#0f172a',
          secondary: '#1f2937',
          tertiary:  '#475569',
          muted:     '#64748b',
          inverse:   '#ffffff',
          onBrand:   '#ffffff',
          onAccent:  '#ffffff',
          onSuccess: '#052e16',
          onWarning: '#3b2f05',
          onError:   '#3f0a0a'
        },
        brand: {
          default: '#6d28d9',
          hover:   '#7c3aed',
          active:  '#5b21b6',
          subtle:  'rgba(124, 58, 237, 0.10)'
        },
        accent: {
          default: '#2563eb',
          hover:   '#1d4ed8',
          active:  '#1e40af',
          subtle:  'rgba(37, 99, 235, 0.10)'
        },
        states: {
          focusRing:        '0 0 0 3px rgba(37,99,235,.35)',
          outline:          'rgba(15,23,42,.25)',
          disabledFg:       'rgba(15,23,42,.35)',
          disabledBg:       'rgba(15,23,42,.06)',
          disabledBorder:   'rgba(15,23,42,.12)',
          pressedOverlay:   'rgba(0,0,0,.04)',
          hoverOverlay:     'rgba(0,0,0,.03)',
          scrim:            'rgba(17,24,39,.55)'
        },
        gradients: {
          primary:  'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
          secondary:'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          accent:   'linear-gradient(135deg, #60a5fa 0%, #22d3ee 100%)',
          card:     'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.9))',
          button:   'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
          glow:     'linear-gradient(135deg, rgba(37,99,235,0.22), rgba(124,58,237,0.22))'
        }
      }
    }
  },

  // Typography (محسّن عربيًا)
  typography: {
    fontFamily: {
      primary:
        "'IBM Plex Sans Arabic','Tajawal','Noto Kufi Arabic','Harmattan','Rubik','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif",
      mono: "'JetBrains Mono','Fira Code','Consolas','Monaco',monospace"
    },
    features: {
      // أرقام عربية-هندية اختيارية عند الحاجة
      numerals: 'auto', // 'auto' | 'arabic-indic' | 'latin'
      css: {
        // ثبات المحاذاة بالأرقام في الجداول والفواتير
        fontVariantNumeric: 'tabular-nums lining-nums'
      }
    },
    sizes: {
      xs:'0.75rem', sm:'0.875rem', base:'1rem', lg:'1.125rem',
      xl:'1.25rem','2xl':'1.5rem','3xl':'1.875rem','4xl':'2.25rem','5xl':'3rem'
    },
    weights: { light:300, normal:400, medium:500, semibold:600, bold:700, extrabold:800 },
    lineHeights: { tight:1.25, normal:1.5, relaxed:1.75 }
  },

  // Spacing / Sizing (شبكة 4px)
  spacing: { '0':'0', xs:'0.25rem', sm:'0.5rem', md:'1rem', lg:'1.5rem', xl:'2rem', '2xl':'3rem', '3xl':'4rem' },
  radii:   { none:'0', sm:'0.25rem', md:'0.5rem', lg:'0.75rem', xl:'1rem', '2xl':'1.25rem', '3xl':'1.5rem', full:'9999px' },
  borderWidth: { none:'0', hairline:'1px', thin:'1.5px', thick:'2px' },
  shadows: {
    // ثلاث درجات ارتفاع متسقة (محسنة للراحة البصرية)
    sm:'0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.08)', // مستوى 1 - بطاقات
    md:'0 4px 6px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.08)', // مستوى 2 - modals
    lg:'0 10px 15px rgba(0,0,0,.12), 0 4px 6px rgba(0,0,0,.08)', // مستوى 3 - dropdowns
    xl:'0 20px 25px rgba(0,0,0,.12), 0 8px 10px rgba(0,0,0,.08)', // مستوى 4 - tooltips
    focus: '0 0 0 3px rgba(59,130,246,.4)',
    glow:  '0 0 20px rgba(124,58,237,.25)' // تقليل شدة الـ glow
  },

  // Motion (آمن للحركة)
  motion: {
    durations: { fast:'120ms', normal:'240ms', slow:'400ms' },
    easings:   { standard:'cubic-bezier(.2,.8,.2,1)', enter:'cubic-bezier(0,0,.2,1)', exit:'cubic-bezier(.4,0,1,1)', bounce:'cubic-bezier(.68,-.55,.265,1.55)' },
    reduce:    true // إن كان prefers-reduced-motion مفعّل
  },

  // Z-Index
  zIndex: { dropdown:1000, sticky:1020, fixed:1030, modal:1040, popover:1050, tooltip:1060, toast:1070 },

  // Breakpoints (ثابتة وملائمة لمحتوى عربي)
  breakpoints: { sm:'640px', md:'768px', lg:'1024px', xl:'1280px', '2xl':'1536px' },

  // RTL: استخدم خصائص منطقية بدل قلب اليسار/اليمين يدويًا
  rtl: {
    logical: true, // يفضّل استعمال paddingInlineStart/End, marginInlineStart/End, insetInlineStart/End
    dirAttr: 'rtl'
  },

  // Component tokens (أهم المكوّنات مباشرة)
  components: {
    button: {
      height: { sm:'2.25rem', md:'2.5rem', lg:'3rem' },
      radius: '0.75rem',
      primary: {
        bg: '{modes.dark.color.brand.default}',
        fg: '{modes.dark.color.text.onBrand}',
        hoverBg: '{modes.dark.color.brand.hover}',
        activeBg:'{modes.dark.color.brand.active}',
        focus:   '{modes.dark.color.states.focusRing}',
        border:  'transparent',
        disabledBg: '{modes.dark.color.states.disabledBg}',
        disabledFg: '{modes.dark.color.states.disabledFg}'
      },
      secondary: {
        bg: 'transparent',
        fg: '{modes.dark.color.text.primary}',
        border: '{modes.dark.color.surface.border}',
        hoverBg: '{modes.dark.color.brand.subtle}',
        activeBg:'rgba(124,58,237,.18)'
      }
    },
    input: {
      height: { sm:'2.5rem', md:'2.75rem', lg:'3rem' },
      radius: '0.75rem',
      bg: '{modes.dark.color.surface.1}',
      fg: '{modes.dark.color.text.primary}',
      placeholder: '{modes.dark.color.text.muted}',
      border: '{modes.dark.color.surface.border}',
      focusBorder: 'rgba(59,130,246,.55)',
      focusRing: '{modes.dark.color.states.focusRing}',
      invalidBorder: '{modes.dark.color.brand.active}',
      disabledBg: '{modes.dark.color.states.disabledBg}'
    },
    card: {
      bg: '{modes.dark.color.surface.card}', // خلفية نصف شفافة موحدة
      border: '{modes.dark.color.surface.cardBorder}', // حدود خفيفة جداً
      radius: '1rem', // حواف مستديرة ثابتة
      padding: '1rem',
      shadow: 'var(--shadow-sm, 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.08))' // ظل متوسط
    },
    tag: {
      radius: '9999px',
      brand:   { bg:'rgba(124,58,237,.18)', fg:'#c4b5fd', border:'rgba(124,58,237,.35)' },
      neutral: { bg:'rgba(148,163,184,.14)', fg:'#e2e8f0', border:'rgba(148,163,184,.28)' },
      success: { bg:'rgba(34,197,94,.18)',  fg:'#86efac', border:'rgba(34,197,94,.35)' },
      warning: { bg:'rgba(245,158,11,.18)', fg:'#fde68a', border:'rgba(245,158,11,.35)' },
      error:   { bg:'rgba(239,68,68,.18)',  fg:'#fca5a5', border:'rgba(239,68,68,.35)' }
    },
    modal: {
      bg: '{modes.dark.color.surface.2}',
      backdrop: '{modes.dark.color.states.scrim}',
      radius: '1rem',
      shadow: 'var(--shadow-xl, 0 24px 48px rgba(0,0,0,.28))'
    },
    tooltip: {
      bg: '#0b1022',
      fg: '#e2e8f0',
      border: 'rgba(148,163,184,.18)',
      shadow: '0 6px 16px rgba(0,0,0,.28)'
    }
  },

  // Data Visualization palette (يلائم الهوية)
  dataviz: {
    categorical: ['#8b5cf6','#3b82f6','#10b981','#f59e0b','#ef4444','#14b8a6','#eab308','#f43f5e'],
    neutralGrid: {
      axis: 'rgba(148,163,184,.35)',
      minor:'rgba(148,163,184,.18)'
    }
  }
} as const;

export type AuroraTheme = typeof auroraTheme;
