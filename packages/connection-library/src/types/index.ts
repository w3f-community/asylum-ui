import { ApiPromise } from '@polkadot/api'
import { Codec } from '@polkadot/types-codec/types/codec'

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

export interface ICodecConvertor {
   convert(api: ApiPromise): Codec
}

export class TemplateChangeAdd implements ICodecConvertor {
   interpretations: Interpretation[]

   constructor(interpretations: Interpretation[]) {
      this.interpretations = interpretations
   }

   convert(api: ApiPromise): Codec {
      return api?.createType('Change', {
         Add: {
            interpretations: this.interpretations.map((x) => [x.interpretation, x.tags]),
         },
      })
   }
}

export class TemplateChangeModify implements ICodecConvertor {
   interpretations: InterpretationInfo[]

   constructor(interpretations: InterpretationInfo[]) {
      this.interpretations = interpretations
   }

   convert(api: ApiPromise): Codec {
      return api.createType('Change', {
         Modify: {
            interpretations: this.interpretations,
         },
      })
   }
}

export class TemplateChangeModifyTags implements ICodecConvertor {
   interpretationId: InterpretationId
   tags: TagName[]

   constructor(interpretationId: InterpretationId, tags: TagName[]) {
      this.interpretationId = interpretationId
      this.tags = tags
   }

   convert(api: ApiPromise): Codec {
      return api.createType('Change', {
         ModifyTags: {
            tags: this.tags,
            interpretationId: this.interpretationId,
         },
      })
   }
}

export class TemplateChangeRemoveInterpretation implements ICodecConvertor {
   interpretationId: InterpretationId

   constructor(interpretationId: InterpretationId) {
      this.interpretationId = interpretationId
   }

   convert(api: ApiPromise): Codec {
      return api?.createType('Change', {
         RemoveInterpretation: {
            interpretationId: this.interpretationId,
         },
      })
   }
}
