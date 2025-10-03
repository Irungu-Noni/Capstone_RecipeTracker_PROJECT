/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts.tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6B9E78',
        secondary: '#D4A574',
        accent: '#A8B58F',
        background: '#FBF9F5',
        'text-primary': '#2D312F',
        'text-secondary': '#6A6F6B',
        success: '#88C9A1',
        info: '#7AA8A0',
        keto: '#B58F9A'
      },
    },
  },
  plugins: [],
}