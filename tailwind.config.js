/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: "2rem",
      center: true
    },
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"]
      },
      backgroundImage: {
        'bg-home': "url('abz/src/assets/bg-min.jpg')"
      }
    },
  },
  plugins: [require('@tailwindcss/forms'), "prettier-plugin-tailwindcss"],
}

