/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gruvbox: {
          bg: "#282828",
          fg: "#ebdbb2",
          aqua: "#b8bb26",
          gray: "#928374",
        },
      },
    },
  },
  plugins: [],
};
