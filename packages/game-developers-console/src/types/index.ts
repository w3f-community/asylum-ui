import { Interpretation, Item, Template } from '@asylum-ui/connection-library'

export interface TemplateWithMetadata extends Template {
   description: string
   img: string
}

export interface InterpretationWithMetadata extends Interpretation {
   metadata: any
}

export interface ItemWithMetadata extends Item {
   description: string
   img: string
   name: string
}

export interface IComponentProps {
   className?: string
}

export interface INetwork {
   name: string
   endpoint: string
}
