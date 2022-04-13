import { GameObject } from 'types'

export const getVariants = (gameList: GameObject[]): string[] => {
   const variants: string[] = []
   gameList.forEach((game: GameObject) => {
      variants.push(game.title)
   })
   return variants
}
