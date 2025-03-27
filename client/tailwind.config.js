/** @type {import('tailwindcss').Config} */

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
      screens: {
        'sm': '640px', // Default
        'md': '768px', // Default
        'lg': '1024px', // Default
        'xl': '1380px', // Custom xl
        '2xl': '1670px', // Custom 2xl
      }
    },
  },
  plugins: [],
};
