/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#1e1e1e',
        "background-form": "#343a40",
        "form-h2": "#868e96",
        "form-input": "#1971c2",
        "nav-back":"#9775fa",
        "purple-strong": "#7950f2"
      },
    },
  },
  plugins: [],
}