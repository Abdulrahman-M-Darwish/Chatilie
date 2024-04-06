import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {},
  daisyui: {
    themes: true,
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
export default config;
