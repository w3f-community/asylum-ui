export type TagName = string
export type InterpretationId = string
export type CID = string

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

export interface Template {
   id: string
   name: string
   max: string
   metadata: CID
   issuer: string
   nftCount: number
}

export interface InterpretationInfo {
   id: InterpretationId
   src: string | undefined
   metadata: CID | undefined
}

export interface Tag {
   id: TagName
   metadata: CID
}

export interface TagMetadataField {
   name: string
   type: string
   defaultValue?: string
   description?: string
}

export interface TagMetadata {
   id: TagName
   description: string
   metadataExtensions: { fields: TagMetadataField[] }
}

export interface Interpretation {
   tags: TagName[]
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
      tags: TagName[]
   }
}

type TemplateChangeRemoveInterpretation = {
   RemoveInterpretation: {
      interpretationId: InterpretationId
   }
}
