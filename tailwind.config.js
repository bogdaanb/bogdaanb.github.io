/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Habilita el modo oscuro por clase
  theme: {
    extend: {
      fontFamily: {
        curvy: ["Curvy", "sans-serif"], // Agrega la fuente "Curvy"
      },
      colors: {
        "blue-custom": "#3498db", // Agrega un color azul personalizado
      },
    },
  },
  plugins: [],
}
