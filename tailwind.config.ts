import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream:       '#F5F5F5',   // page background — clean light gray
        'cream-2':   '#EEEEEE',   // slightly darker section bg
        'cream-3':   '#E3E3E3',   // hover / slightly darker still
        terracotta:  '#C9963F',   // PRIMARY ACCENT — gold (replaces terracotta)
        'terra-dk':  '#A87A2B',   // darker gold
        olive:       '#1A1A1A',   // near-black (dark section backgrounds)
        'olive-dk':  '#0A0A0A',   // black
        gold:        '#C9963F',   // gold accent (same as terracotta — unified)
        'gold-dk':   '#A87A2B',   // darker gold
        ink:         '#0A0A0A',   // body text — pure black
        'ink-soft':  '#6B6B6B',   // secondary text — neutral gray
        line:        '#DCDCDC',   // borders — light gray
        paper:       '#FFFFFF',   // card backgrounds — pure white
        spicy:       '#C0432B',   // error / warning states
      },
      fontFamily: {
        sans:  ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      borderRadius: {
        '2xl': '18px',
        '3xl': '24px',
        '4xl': '30px',
      },
      boxShadow: {
        bowl: '0 18px 50px -28px rgba(0,0,0,.35)',
        card: '0 8px 24px -16px rgba(0,0,0,.18)',
      },
    },
  },
  plugins: [],
};
export default config;
