/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require('tailwindcss/colors')
module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
        serif: [...defaultTheme.fontFamily.serif],
        mono: [...defaultTheme.fontFamily.mono]
      },
      colors: {
        background: 'rgb(219, 219, 219)',
        initiativeBackground: 'rgb(163, 163, 163)',
      },
      boxShadow: {
        'monsterCard':'1px 1px 7px 2px rgba(189, 189, 189, 0.849)'
      }
    },
  },
  plugins: [],
}