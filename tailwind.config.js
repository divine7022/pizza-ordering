/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // basically this is called as the overwriting of the default tailwind configuration.
  theme: {
    fontFamily: {
      sans: "Roboto Mono, monospace",
    },
    // by overwit
    // colors:{
    //   pizza: "#123456"
    // }

    // look if i write the colour property out side of the extend then it overwrite the given colour, but in the above case the colour which we given is doesn't exist in the tailwind to it gives a error. So to use it in a requered palce, define the unexist colour(Ex:#123456) in the Tailwind in the extend:{} property below.
    extend: {
      colors: {
        pizza: "#123456",
      },
      fontSize: {
        huge: ["80rem", { lineHeight: "1" }],
      },
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};

// these are just to overwirte the exesting default font family of the tailwind. (if we want to see the default configuration(like default tailwind font style , size etc) then visit the default configuration repositry of the tailwind in github, which the link you can get in the official website of the Tailwind)

// By Default:
// height {
//  screen: "100vh"} So this 100vh it create problem in some browser. so now we have even more modern unit which is called "dvh" [which stands for dynamic view port height]
