import { Template } from '@asylum-ui/connection-library'

export interface TemplateWithMetadata extends Template {
   description: string
   img: string
}

export interface IComponentProps {
   className?: string
}

export interface INetwork {
   name: string
   endpoint: string
}
