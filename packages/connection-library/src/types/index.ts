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

export interface InterpretationInfo {
	id: any, //TODO BoundedInterpretationId,
	src: string | undefined,
	metadata: string | undefined,
}

export interface Interpretation {
   tags: string[],
   interpretation: InterpretationInfo
}