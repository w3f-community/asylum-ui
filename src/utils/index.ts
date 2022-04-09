import shuffle from 'lodash/shuffle';

export const formatAddress = (address: string) => {
   return `0x${address.substring(0, 4).toUpperCase()}...${address
      .substring(address.length - 4)
      .toUpperCase()}`
}

function decToHexColor(colorNumber: any) {
   return `${colorNumber.toString(16).padStart(6, '0')}`
}

function getBinaryList(number: any, size: any) {
   return number.toString(2).padStart(size, '0').split('')
}

function parseAvatarData(data: any, separator: any) {
   const ret = {
      xAxis: 0,
      yAxis: 0,
      colorMap: shuffle(['f9d5e5', 'eeac99', 'e06377', 'c83349', '5b9aa0', 'd6d4e0', 'b8a9c9', '622569', '588c7e']),
   }

   if (!data) {
      return ret
   }

   data.split(separator).forEach((element: any, index: any) => {
      const intVal = parseInt(element, 36)

      switch (index) {
      case 0:
         ret.xAxis = intVal
         break
      case 1:
         ret.yAxis = intVal
         break

      default:
         // @ts-ignore
         console.log(decToHexColor(intVal))
         // ret.colorMap.push(decToHexColor(intVal))
         break
      }
   })

   return ret
}

function generateRandomAvatarData(seeds: number[], complexity = 16, avatarDataSeparator = '-') {
   const xAxis = Math.floor(Math.random() * Math.pow(2, complexity - 1))
   const yAxis = Math.floor(Math.random() * (Math.pow(2, complexity) - 1)) + 1

   const rows = getBinaryList(yAxis, complexity)
   let ret = `${xAxis.toString(36)}${avatarDataSeparator}${yAxis.toString(36)}`
   let color

   let counter = 2
   rows.forEach(() => {
      color = Math.floor(Math.random() * 16777215)
      ret += `${avatarDataSeparator}${color.toString(36)}`
      counter++
   })

   return ret
}

function getAvatarFromData(
   avatarData: any,
   renderMethod = 'square',
   size = 256,
   avatarDataSeparator = '-'
) {
   const { xAxis, yAxis, colorMap } = parseAvatarData(avatarData, avatarDataSeparator)
   const complexity = colorMap.length
   console.log('complexity', complexity)
   const resolution = Math.floor(size / complexity)

   if (complexity < 1 || xAxis >= Math.pow(2, complexity)) {
      throw Error('Incorrect avatar data')
   }

   let renderProcess = (resolution: any, indexX: any, indexY: any) =>
      `M${indexX * resolution},${indexY * resolution} h${resolution} v${resolution} h${
         0 - resolution
      }Z`

   if (renderMethod === 'circle') {
      renderProcess = (resolution, indexX, indexY) => {
         const radius = resolution / 2
         return `M${indexX * resolution},${
            indexY * resolution + radius
         } a${radius} ${radius} 0 1,1 ${resolution},0 a${radius} ${radius} 0 1,1 -${resolution},0`
      }
   } else if (typeof renderMethod === 'function') {
      renderProcess = renderMethod
   }

   const rows = getBinaryList(yAxis, complexity)
   const cols = getBinaryList(xAxis, complexity)
   let ret = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ${size} ${size}">`

   rows.forEach((rowItem: any, indexY: any) => {
      const draw: any[] = []
      cols.forEach((colItem: any, indexX: any) => {
         if (parseInt(rowItem, 10) ^ parseInt(colItem, 10)) {
            draw.push(renderProcess(resolution, indexX, indexY))
         }
      })
      ret += `<path fill="#${colorMap[indexY]}" d="${draw.join(' ')}"/>`
   })

   return `${ret}</svg>`
}

export function getRandomAvatar(seeds: number[], complexity = 16, renderMethod = 'square', size = 256) {
   const avatarData = generateRandomAvatarData(seeds, complexity)
   return getAvatarFromData(avatarData, renderMethod, size)
}
