/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    colors: {
      'body-bg': '#F3F3F3',
      black: '#23292B',
      white: '#fff',
      danger: '#DC3545',
      success: '#198754',
      gray: {
        DEFAULT: '#D5D5D5',
        light: '#F3F4F6',
        dark: '#D1D5DB',
        'extra-dark': '#9A9DA0'
      },
      orange: {
        200: '#FF9100',
        400: '#FF6D00',
        600: '#FF5400',
        800: '#FF4800'
      },
      blue: {
        200: '#005FED',
        400: '#0054D2',
        600: '#0049B7',
        800: '#003D81'
      },
      transparent: 'transparent'
    },
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        'bebas-neue': ['Bebas Neue']
      },
      animation: {
        shake: 'shake 0.2s ease-in-out 0s 2'
      },
      keyframes: {
        shake: {
          '0%': { 'margin-left': '0' },
          '25%': { 'margin-left': '0.5rem' },
          '75%': { 'margin-left': '-0.5rem' },
          '100%': { 'margin-left': '0' }
        }
      }
    }
  },
  plugins: []
}
