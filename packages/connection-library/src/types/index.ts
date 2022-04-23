export interface GameMetadata {
   id: string
   title: string
   img: string
   genre: string
   shortDescription: string
   description: string
   gallery: string[]
   reviews: Review[]
}

export interface Game {
   id: string
   owner: string
   issuer: string
   admin: string
   freezer: string
   templates: string[] | null
   price: number
}

export interface Review {
   id: string
   name?: string
   text?: string
   date?: string
   rating: number
   address: string
}
