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
          roboto: ['Roboto']
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
          
        },
      },
    },
    plugins: [],
  }
  
  