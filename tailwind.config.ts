import type { Config } from 'tailwindcss'
import animatePlugin from 'tailwindcss-animate'
import typographyPlugin from '@tailwindcss/typography'
import aspectRatioPlugin from '@tailwindcss/aspect-ratio'

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Figtree', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: 'rgba(255, 255, 255, 0.1)',
        input: 'rgba(255, 255, 255, 0.1)',
        ring: 'oklch(58.5% .233 277.117)',
        background: 'oklch(14.5% 0 0)',
        foreground: '#ffffff',
        primary: {
          DEFAULT: 'oklch(58.5% .233 277.117)',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: 'rgba(255, 255, 255, 0.05)',
          foreground: '#ffffff',
        },
        destructive: {
          DEFAULT: 'hsl(0, 84%, 60%)',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
          foreground: 'rgba(255, 255, 255, 0.6)',
        },
        accent: {
          DEFAULT: 'oklch(58.5% .233 277.117)',
          foreground: '#ffffff',
        },
        popover: {
          DEFAULT: 'oklch(16% 0 0)',
          foreground: '#ffffff',
        },
        card: {
          DEFAULT: 'rgba(255, 255, 255, 0.03)',
          foreground: '#ffffff',
        },
        success: '#10b981',
      },
      borderRadius: {
        lg: '1rem',
        md: '0.75rem',
        sm: '0.5rem',
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        blob: 'blob 10s infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
    },
  },
  plugins: [animatePlugin, typographyPlugin, aspectRatioPlugin],
} satisfies Config
