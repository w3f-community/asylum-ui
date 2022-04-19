export interface ITemplate {
   title: string
   img: string
   id: number
   description: string
}

export interface IComponentProps {
   className?: string
}

export interface Review {
   id: string
   name?: string
   text?: string
   date?: string
   rating: number
   address: string
}

export interface INetwork {
   name: string
   endpoint: string
}
