import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      transitionProperty: {
        width: "width",
      },
      fontFamily: {
        "roboto-mono": "var(--font-roboto-mono)",
      },
      colors: {
        "dodger-blue": {
          "50": "hsl(212, 87%, 97%)",
          "100": "hsl(212, 81%, 94%)",
          "200": "hsl(211, 80%, 86%)",
          "300": "hsl(209, 82%, 74%)",
          "400": "hsl(208, 80%, 60%)",
          "500": "hsl(208, 76%, 50%)",
          "600": "hsl(210, 84%, 39%)",
          "700": "hsl(210, 82%, 32%)",
          "800": "hsl(211, 77%, 27%)",
          "900": "hsl(211, 69%, 24%)",
          "950": "hsl(214, 68%, 16%)",
        },
        "chetwode-blue": {
          "50": "hsl(233, 100%, 96%)",
          "100": "hsl(231, 100%, 94%)",
          "200": "hsl(233, 100%, 88%)",
          "300": "hsl(235, 100%, 81%)",
          "400": "hsl(240, 100%, 75%)",
          "500": "hsl(245, 93%, 67%)",
          "600": "hsl(249, 84%, 59%)",
          "700": "hsl(250, 65%, 51%)",
          "800": "hsl(249, 61%, 41%)",
          "900": "hsl(248, 53%, 34%)",
          "950": "hsl(250, 53%, 20%)",
        },
        sail: {
          "50": "hsl(204, 100%, 97%)",
          "100": "hsl(204, 88%, 94%)",
          "200": "hsl(201, 89%, 85%)",
          "300": "hsl(200, 91%, 74%)",
          "400": "hsl(199, 88%, 60%)",
          "500": "hsl(199, 84%, 48%)",
          "600": "hsl(201, 93%, 39%)",
          "700": "hsl(202, 91%, 32%)",
          "800": "hsl(202, 86%, 27%)",
          "900": "hsl(203, 75%, 24%)",
          "950": "hsl(205, 75%, 16%)",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          secundary: "hsl(var(--accent-secundary))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
