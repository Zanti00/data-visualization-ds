/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        spotify: {
          green: "#1DB954",
          dark1: "#212121",
          dark2: "#121212",
          gray1: "#535353",
          gray2: "#B3B3B3",
          bg: "#0A0B0D",
          card: "#121418",
          border: "#1DB954"
        }
      }
    },
  },
  plugins: [],
}
