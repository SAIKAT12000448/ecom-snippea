/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
     
    
    },
  },
  plugins: [require("@tailwindcss/typography"),require("daisyui")],

}

