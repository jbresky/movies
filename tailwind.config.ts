/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        'xsm': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1300px'
      },
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
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}