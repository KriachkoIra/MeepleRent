/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  mode: "jit",
  safelist: [
    "bg-background",
    "bg-primary",
    "bg-secondary",
    "text-primary",
    "text-secondary",
  ],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F7F9EF",
        primary: "#EA6A55",
        secondary: "#F5C47B",
      },
    },
  },
  plugins: [],
};
