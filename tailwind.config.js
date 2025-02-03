/** @type {import('tailwindcss').Config} */
export default {
    content: [],
    theme: {
      screens: {
        'xs': '482px',
        'sm': '640px',
        'md': '768px',
        'lg': '1080px',
        'xl': '1280px',
        '2xl': '1440px',
      },
      extend: {
        fontFamily: {
          pop: ['Poppins'],
          rob: ['Roboto']
        },
        fontSize: {
          'h1': '48px',
          'h2': '36px',
          'h3': '20px',
          'b1': '18px',
          'b2': '16px',
          'b3': '14px',
          'b4': '12px'
        },
        colors: {
          primary: '#7FE932'          
        },
      },
    },
    plugins: [require("daisyui")],
    daisyui: {
      themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
      darkTheme: "light", // name of one of the included themes for dark mode
      base: true, // applies background color and foreground color for root element by default
      styled: true, // include daisyUI colors and design decisions for all components
      utils: true, // adds responsive and modifier utility classes
      prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
      logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
      themeRoot: ":root", // The element that receives theme color CSS variables
    },
  }
  
  