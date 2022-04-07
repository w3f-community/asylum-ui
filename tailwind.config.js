const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
   content: ['./src/**/**/*.{ts,tsx}'],
   corePlugins: {
      container: false,
   },
   theme: {
      fontSize: {
         sm: ['0.75rem', '1.125rem'],
         base: ['0.875rem', '1.25rem'],
         lg: ['1rem', '1.5rem'],
         xl: ['1.5rem', '1.5rem'],
         '2xl': ['1.75rem', '3rem'],
      },
      extend: {
         backgroundImage: {
            'gradient-hr':
               'linear-gradient(90deg, rgba(48, 48, 48, 1) 0%, rgba(255, 255, 255, 1) 20%, rgba(250, 250, 250, 1) 80%, rgba(48, 48, 48, 1) 100%)',
            'gradient-active': 'linear-gradient(79.63deg, #b62bd9 -21.85%, #50bfff 122.14%)',
            empty: 'url("/public/empty-img.jpg")',
         },
         fontFamily: {
            sans: ['ubuntu', ...defaultTheme.fontFamily.sans],
            secondary: ['Oxanium', 'cursive'],
         },
         colors: {
            gray: {
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
