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
        cream:       '#FAF7F2',   // warm linen — page background
        'cream-2':   '#F2EDE5',   // slightly deeper warm bg
        'cream-3':   '#E8DED3',   // hover / input states
        terracotta:  '#C8603A',   // true terracotta — warm red-orange
        'terra-dk':  '#A84D2C',   // deeper terracotta
        olive:       '#3D4A2D',   // olive green — badges / accents
        'olive-dk':  '#2A3320',   // deeper olive
        gold:        '#C9963F',   // warm gold accent
        'gold-dk':   '#A87A2B',   // deeper gold
        ink:         '#1C1008',   // warm espresso — body text
        'ink-soft':  '#7C6B5E',   // warm brown-gray — secondary text
        line:        '#E5D9CE',   // warm linen border
        paper:       '#FFFCF7',   // warm white — card backgrounds
        spicy:       '#C0432B',   // spicy / error indicator
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
