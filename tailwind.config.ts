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
        cream:       '#FBF4E6',
        'cream-2':   '#F5EAD6',
        'cream-3':   '#EFE0C7',
        terracotta:  '#BE5436',
        'terra-dk':  '#9E4128',
        olive:       '#6E7340',
        'olive-dk':  '#565B30',
        gold:        '#C9963F',
        'gold-dk':   '#A87A2B',
        ink:         '#39271C',
        'ink-soft':  '#6A5343',
        line:        '#E2D2B4',
        paper:       '#FFFCF5',
        spicy:       '#C0432B',
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
        bowl: '0 18px 50px -28px rgba(57,39,28,.55)',
        card: '0 8px 24px -16px rgba(57,39,28,.5)',
      },
    },
  },
  plugins: [],
};
export default config;
