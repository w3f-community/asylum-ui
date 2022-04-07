module.exports = {
   content: ['./src/**/**/*.{ts,tsx}'],
   corePlugins: {
      container: false,
   },
   theme: {
      extend: {
         fontFamily: {
            roboto: ['Roboto'],
         },
         colors: {
            'asylum-purple': '#B62BD9',
            'asylum-blue': '#50BFFF',
            'asylum-gray-1': '#303030',
            'asylum-gray-2': '#131313',
            'custom-pink': '#6200EE',
            gray: {
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
