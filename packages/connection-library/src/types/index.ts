export type Tag = string
export type InterpretationId = string

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
   issuer: string[]
   admin: string[]
   freezer: string[]
   templates: string[] | null
   assets: number[] | null
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
   id: InterpretationId
   src: string | undefined
   metadata: string | undefined
}

export interface Interpretation {
   tags: Tag[]
   interpretation: InterpretationInfo
}

export declare type ChangeSet = Array<
   | TemplateChangeAdd
   | TemplateChangeModify
   | TemplateChangeModifyTags
   | TemplateChangeRemoveInterpretation
>

type TemplateChangeAdd = {
   Add: {
      interpretations: Interpretation[]
   }
}

type TemplateChangeModify = {
   Modify: {
      interpretations: InterpretationInfo[]
   }
}

type TemplateChangeModifyTags = {
   ModifyTags: {
      interpretationId: InterpretationId
      tags: Tag[]
   }
}

type TemplateChangeRemoveInterpretation = {
   RemoveInterpretation: {
      interpretationId: InterpretationId
   }
}
