// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure your paths are correct
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A", // Example Primary Color (Indigo-800)
        secondary: "#F59E0B", // Example Secondary Color (Amber-500)
      },
    },
  },
  plugins: [],
};
