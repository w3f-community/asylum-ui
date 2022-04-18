const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
   content: ['./src/**/**/*.{ts,tsx}'],
   corePlugins: {
      container: false,
   },
   theme: {
      fontSize: {
         sm: ['0.75rem', '1.125rem'], // 12px
         base: ['0.875rem', '1.25rem'], // 14px
         lg: ['1rem', '1.5rem'], // 16px
         xl: ['1.5rem', '1.5rem'], // 24px
         '2xl': ['1.75rem', '3rem'], // 28px
      },
      extend: {
         backgroundImage: {
            'gradient-overlay':
               'linear-gradient(211.48deg, rgba(80, 191, 255, 0.25) 8.26%, rgba(204, 0, 255, 0.25) 96.1%)',
            'gradient-hr':
               'linear-gradient(90deg, rgba(48, 48, 48, 1) 0%, rgba(255, 255, 255, 1) 20%, rgba(250, 250, 250, 1) 80%, rgba(48, 48, 48, 1) 100%)',
            'gradient-active': 'linear-gradient(79.63deg, #b62bd9 -21.85%, #50bfff 122.14%)',
            'gradient-hr-active':
               'linear-gradient(270.01deg, rgba(80, 191, 255, 0) 0.01%, #50BFFF 33.19%, #B62BD9 71.18%, rgba(182, 43, 217, 0) 102.75%)',
            empty: 'url("/public/empty-img.jpg")',
            'empty-second': 'url("/public/empty.png")',
            search: 'url("assets/img/search.png")',
         },
         fontFamily: {
            sans: ['ubuntu', ...defaultTheme.fontFamily.sans],
            secondary: ['Oxanium', 'cursive'],
         },
         minWidth: {
            20: '11rem',
         },
         colors: {
            asylum: {
               blue: '#50BFFF',
            },
            blue: {
               500: '#5AB2E4',
            },
            gray: {
               500: '#979797',
               700: '#303030',
               800: '#131313',
            },
         },
      },
   },
   plugins: [
      function ({ addComponents }) {
         addComponents({
            '.container': {
               maxWidth: '100%',
               '@screen sm': {
                  maxWidth: '100%',
               },
               '@screen md': {
                  maxWidth: '700px',
               },
               '@screen lg': {
                  maxWidth: '800px',
               },
               '@screen xl': {
                  maxWidth: '940px',
               },
               '@screen 2xl': {
                  maxWidth: '1280px',
               },
            },
         })
      },
   ],
}
