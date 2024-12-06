/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1A4D2E",
        button: "#1A4D2E",
        text: "#F5EFE6",
      },
    },
  },
  plugins: [require("daisyui")],
};
