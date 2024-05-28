/** @type {import('tailwindcss').Config} */
export default {
   content: ["./src/**/*.{html,js,tsx,jsx,ts}"],
   theme: {
      screens: {
         xl: { max: "1279px" },
         // => @media (max-width: 1279px) { ... }

         lg: { max: "1023px" },
         // => @media (max-width: 1023px) { ... }

         md: { max: "767px" },
         // => @media (max-width: 767px) { ... }

         sm: { max: "639px" },
         // => @media (max-width: 639px) { ... }
      },
      extend: {
         colors: {
            card: "#27272A",
            title: "#FBCB56",
            primaryTitle: "#F8F8F8",
            disabledTitle: "#6B6B73",
         },
      },
   },
   plugins: [],
};
