/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5429CC",
        secondary: "#33CC95",
        button: "#6933FF",
        buttonActive: "#5a20fa",
        buttonHover: "#7646fa",
        background: "#F0F2F5",
        titles: "#363F5F",
        text: "#969CB3",
      },
    },
  },
  plugins: [],
};
