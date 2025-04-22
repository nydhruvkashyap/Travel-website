/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Include all files in the "app" directory
    "./components/**/*.{js,ts,jsx,tsx}", // Include all files in the "components" directory
    "./pages/**/*.{js,ts,jsx,tsx}", // Include all files in the "pages" directory (if using `pages` folder)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};