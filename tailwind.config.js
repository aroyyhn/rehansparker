/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e91e63", // pink accent
        soft: "#f7f7f8",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
],
};
