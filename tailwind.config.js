/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1890ff",
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#1890ff",
          600: "#1677ff",
          700: "#0958d9",
        },
        accent: {
          DEFAULT: "#ff7a00",
          500: "#ff7a00",
        },
      },
      fontFamily: {
        sans: ["PingFang SC", "Microsoft YaHei", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
}
