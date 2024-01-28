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
        'sm': '645px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1300px'
      },
    },
    extend: {
      colors: {
        'grayth': '#929aa5',
        'purple': '#655bf3',
        'deep-blue': '#060d17'
      },
      screens: {
        '2xsm': '377px',
        's': '568px',
        'xsm': '480px',
        '2xl': '1480px'
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