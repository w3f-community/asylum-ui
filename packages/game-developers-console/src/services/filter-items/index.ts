import { GameObject } from 'types'

export const filterItems = (inputValue: string, items: GameObject[]): GameObject[] => {
   return items.filter(item => {
      return item.title.toLowerCase().includes(inputValue.toLowerCase())
   })
}
