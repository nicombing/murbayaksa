/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FCFAF8', // Soft cream / off-white
        card: '#E8EFE8', // Pastel sage green
        'card-hover': '#D4E0D4', // Darker sage for hover
        text: '#234B34', // Deep forest green
        'text-muted': '#475569',
        accent: '#C86A51', // Warm terracotta
        'accent-hover': '#B35E47',
        primary: '#234B34', // Same as text for main buttons
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
