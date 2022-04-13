export interface GameObject {
   title: string
   img: string
   id: string
   description: string
}

export interface ITemplates {
   title: string
   img: string
   id: number
   description: string
   onActionClick?: (id: number) => void
   actionText?: string
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
}