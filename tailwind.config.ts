import type { Config } from "tailwindcss";
const defaultTheme = require('tailwindcss/defaultTheme')
import flowbite from "flowbite-react/tailwind";
import { nextui } from "@nextui-org/react";


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        'xs': '280px',
        ...defaultTheme.screens,
        '3xl': '1600px',
      }
    },
  },
  darkMode: "class",
  plugins: [flowbite.plugin(), nextui()],
};
export default config;
