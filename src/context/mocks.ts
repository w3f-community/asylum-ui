import { GameObject } from '../types'

const url: string =
   'https://s3-alpha-sig.figma.com/img/bc25/cbef/2a97bc60cb72c773087d59768843d04d?Expires=1650240000&Signature=NgrrwPjn0Gv6NlYBFEVoZ3D4NX2h-x52AXSOzKg1jCP6hz9C1QJTvqUJ~eaOqgbLgGDk89lbpJv42te9mjQ7d4WuHhlof4RjMihpqJSP8HS5ScznSkcWQJfMA3ZxW7yykFiujAJ4w5B1fpyIwdd6AwqnlNjbteH1gf~FIoj5yKKqCYUmCfrqIwrv59cT2OsLdNtc2Xz9XBkqiUasx5EUznqXD8cclK9qyxNp8ITVo~1qi2acjq6Q3C6kI~9JnJ5EEIiQtac3d5GOIYlHpVHFuG-JnaexshIKEDO6FGBwnHl7kfjQzZ2e08iTKj2qxV99pLY2wjduVXSKW12CA8dhdA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'

export const games: GameObject[] = [
   {
      title: 'Fortnite',
      img: url,

      id: '1',
   },
   {
      title: 'GTA V',
      img: url,
      id: '2',
   },
   {
      title: 'Game a',
      img: url,
      id: '3',
   },
   {
      title: 'Minecraft',
      img: url,
      id: '4',
   },
   {
      title: 'Call of Duty',
      img: url,
      id: '5',
   },
   {
      title: 'RDR2',
      img: url,
      id: '6',
   },
   {
      title: 'Stalker',
      img: url,
      id: '7',
   },
   {
      title: 'Slime Rancher',
      img: url,
      id: '8',
   },
]
