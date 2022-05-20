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
               'linear-gradient(90deg, rgba(48, 48, 48, 0) 0%, rgba(255, 255, 255, 1) 20%, rgba(250, 250, 250, 1) 80%, rgba(48, 48, 48, 0) 100%)',
            'gradient-active': 'linear-gradient(79.63deg, #b62bd9 -21.85%, #50bfff 122.14%)',
            'gradient-hr-active':
               'linear-gradient(270.01deg, rgba(80, 191, 255, 0) 0.01%, #50BFFF 33.19%, #B62BD9 71.18%, rgba(182, 43, 217, 0) 102.75%)',
            empty: 'url("/public/img/empty.png")',
            'empty-second': 'url("/public/img/empty.png")',
         },
         fontFamily: {
            sans: ['ubuntu', ...defaultTheme.fontFamily.sans],
            secondary: ['Oxanium', ...defaultTheme.fontFamily.sans],
         },
         colors: {
            asylum: {
               magenta: '#8D7AEC',
               blue: '#50BFFF',
               pink: '#B62BD9',
            },
            gray: {
               500: '#979797',
               700: '#303030',
               800: '#131313',
            },
         },
         lineClamp: {
            15: '15',
         },
         keyframes: {
            'slide-out': {
               '0%': {
                  transform: 'translateY(0)',
                  background: 'rgba(48, 48, 48, 0.7)',
               },
               '30%': {
                  transform: 'translateY(0)',
                  background: 'transparent',
               },
               '100%': {
                  transform: 'translateY(100%)',
                  background: 'transparent',
               },
            },
            'slide-in': {
               '0%': {
                  transform: 'translateY(100%)',
                  background: 'transparent',
               },
               '70%': {
                  transform: 'translateY(0)',
                  background: 'transparent',
               },
               '100%': {
                  transform: 'translateY(0)',
                  background: 'rgba(48, 48, 48, 0.7)',
               },
            },
            'fade-in': {
               '0%': {
                  opacity: '0',
               },
               '100%': {
                  opacity: '1',
               },
            },
            'fade-out': {
               '0%': {
                  opacity: '1',
               },
               '100%': {
                  opacity: '0',
               },
            },
         },
         animation: {
            'slide-out': 'slide-out 0.7s ease-in forwards',
            'slide-in': 'slide-in 0.7s ease-in forwards',
            'fade-in': 'fade-in 0.15s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            'fade-out': 'fade-out 0.15s cubic-bezier(0.4, 0, 0.2, 1) forwards',
         },
      },
   },
   plugins: [
      require('@tailwindcss/line-clamp'),
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
