// tailwind.config.js code :
/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*/{vue,js,ts,jsx,tsx'],
  mode: 'jit',
  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}

