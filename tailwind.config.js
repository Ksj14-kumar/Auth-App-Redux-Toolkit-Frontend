/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "mobile": "340px",
        "mobile1": { "max": "368px" }
      }
    },

  },
  plugins: [],
}