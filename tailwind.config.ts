import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0B1F3A",
        ink: "#122033",
        gold: "#C89B3C",
        steel: "#5F6F85",
        mist: "#F4F6F8"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(11, 31, 58, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
