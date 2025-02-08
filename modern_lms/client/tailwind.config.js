/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bluegradientR: "linear-gradient(to right, #23395e, #0258cf)",
        bluegradientL: "linear-gradient(to left, #23395e, #0258cf)",
        footerGradient:
          "linear-gradient(120deg, #23395e 0%, #0258cf 35%, #0258cf 65%, #23395e 100%)",
      },
    },
  },
  plugins: [],
};
