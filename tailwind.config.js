/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "5.5rem",
          sm: "6.5rem",
          lg: "7.5rem",
          xl: "8.5rem",
          "2xl": "9.5rem",
        },
      },
      fontFamily: {
        primary: ["Nunito Sans", "sans-serif"],
        secondary: ["Abel", "sans-serif"],
        cairo: ["Cairo", "sans-serif"],
      },
      colors: {
        primary: "#96e0ff",
        secondary: "#676e6d",
      },
      boxShadow: {
        custom:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
};
