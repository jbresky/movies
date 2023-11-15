import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xl': '1300px'
    },
    extend: {
      colors: {
        'grayth': '#929aa5'
      },
      gridTemplateColumns: {
        'xl': 'repeat(auto-fill, minmax(250px, 1fr))',
        '2xl': 'repeat(auto-fill, minmax(300px, 1fr))'
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
