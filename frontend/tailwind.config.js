/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  plugins: [require("@tailwindcss/line-clamp")],
  content: ["./src/**/*.{html,ts}"],
  safelist: [
    {
      pattern: /(from|to|bg|text)-(blue|green|yellow|red)-(100|200|50|600)/,
    },
  ],
};
