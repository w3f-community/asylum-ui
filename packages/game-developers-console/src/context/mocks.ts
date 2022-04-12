import { GameObject, Review } from 'types'

// const url: string =
//    // eslint-disable-next-line max-len
//    'https://s3-alpha-sig.figma.com/img/bc25/cbef/2a97bc60cb72c773087d59768843d04d?Expires=1650240000&Signature=NgrrwPjn0Gv6NlYBFEVoZ3D4NX2h-x52AXSOzKg1jCP6hz9C1QJTvqUJ~eaOqgbLgGDk89lbpJv42te9mjQ7d4WuHhlof4RjMihpqJSP8HS5ScznSkcWQJfMA3ZxW7yykFiujAJ4w5B1fpyIwdd6AwqnlNjbteH1gf~FIoj5yKKqCYUmCfrqIwrv59cT2OsLdNtc2Xz9XBkqiUasx5EUznqXD8cclK9qyxNp8ITVo~1qi2acjq6Q3C6kI~9JnJ5EEIiQtac3d5GOIYlHpVHFuG-JnaexshIKEDO6FGBwnHl7kfjQzZ2e08iTKj2qxV99pLY2wjduVXSKW12CA8dhdA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'

export const games: GameObject[] = [
   {
      title: 'Fortnite',
      img: 'https://static-assets-prod.epicgames.com/fortnite/static/webpack/8f9484f10eb14f85a189fb6117a57026.jpg',
      description: 'Free-to-play Battle Royale',
      id: '1',
   },
   {
      title: 'GTA V',
      img: 'https://files.tecnoblog.net/wp-content/uploads/2018/07/gta-v.jpg',
      description: 'Entertainment blockbusters',
      id: '2',
   },
   {
      title: 'Last of Us II',
      img: 'https://upload.wikimedia.org/wikipedia/pt/9/96/The_Last_of_Us_2_capa.png',
      description: 'Survival game',
      id: '3',
   },
   {
      title: 'Minecraft',
      img: 'https://play-lh.googleusercontent.com/yAtZnNL-9Eb5VYSsCaOC7KAsOVIJcY8mpKa0MoF-0HCL6b0OrFcBizURHywpuip-D6Y=w412-h220-rw',
      description: '3D sandbox game',
      id: '4',
   },
   {
      title: 'Call of Duty',
      img: 'https://image.api.playstation.com/vulcan/img/cfn/1130791_COqLRw6IGlDVHxyV8aqC9_YaF0sCN8IbOlVhzJ6sWm5tlpKTjN8npK2vA_mUJUdyQjP4-U4rEnk7cScmlvoLzXi7.png',
      description: 'First-person shooter',
      id: '5',
   },
   {
      title: 'RDR2',
      img: 'https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png',
      description: 'Western action-adventure',
      id: '6',
   },
   {
      title: 'Stalker',
      img: 'https://s1.gaming-cdn.com/images/products/5376/orig-fallback-v1/s-t-a-l-k-e-r-2-heart-of-chornobyl-pc-game-steam-europe-cover.jpg',
      description: 'First-person shooter',
      id: '7',
   },
   {
      title: 'Metro 2033',
      img: 'https://image.api.playstation.com/cdn/EP4062/CUSA00591_00/o0nw1XsrxYS4wuug9cTqPFqPhRinf2zd.png',
      description: 'First-person life simulation',
      id: '8',
   },
   {
      title: 'Empty',
      img: '',
      description: 'Empty img for tet',
      id: '9',
   },
]

export const reviews: Review[] = [
   {
      id: '1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      rating: 3.5,
   },
   {
      id: '2',
      text: 'Proin condimentum dapibus libero quis molestie. Fusce a turpis ut turpis hendrerit pellentesque. Quisque in odio eu nulla rutrum laoreet. Donec vitae vehicula eros, sed luctus metus. Fusce quis neque dictum, ornare dui sed, vulputate purus. Donec porta tortor condimentum velit volutpat consectetur. Integer porttitor nulla in nisl laoreet, sit amet porta quam ultrices. Duis at tempor urna. Vestibulum nec convallis neque. Vivamus auctor aliquam aliquam. Maecenas eu arcu urna.',
      rating: 4.5,
   },
]
