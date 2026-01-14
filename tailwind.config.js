/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deepblue: "#0C2340",
        cream: "#FFF2CC",
        copper: "#B87845",
      },
    },
  },
  plugins: [],
};
