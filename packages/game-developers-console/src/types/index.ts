export interface GameObject {
   title: string
   img: string
   id: string
   description: string
}

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

export interface IInterpretation {
   type: '2d sprite' | '3d sprite'
   name: string
   img: string
   properties: {
      [key: string]: string
   }
   description: string
}
