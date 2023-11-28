import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xsm': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1300px'
    },
    extend: {
      colors: {
        'grayth': '#929aa5'
      },
      gridTemplateColumns: {
        'sm': 'repeat(auto-fill, minmax(170px, 1fr))',
        'md': 'repeat(auto-fill, minmax(200px, 1fr))',
        'lg': 'repeat(auto-fill, minmax(250px, 1fr))',
        'xl': 'repeat(auto-fill, minmax(300px, 1fr))'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
