import { Poppins } from "next/font/google";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        Poppins : ['poppins', 'sans-serif']
      },
      colors: {
        customblue : '#5D5DFF',
        background: "var(--background)",
        foreground: "var(--foreground)",
      
      },
    },
  },
  plugins: [],
} satisfies Config;