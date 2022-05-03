import axios from 'axios'
import { find, intersection, keys, map } from 'lodash/fp'

import { CID, TagMetadata, TagName } from '@asylum-ui/connection-library'

export const formatAddress = (address: string) => {
   return `${address.substring(0, 4).toUpperCase()}...${address
      .substring(address.length - 4)
      .toUpperCase()}`
}

export const getFile = async (cid: CID) => {
   const { data } = await axios.get(`http://localhost:8080/ipfs/${cid}`)
   return data
}

export const getAllFiles = async (cidArray: CID[]) => {
   const result = await Promise.all(
      cidArray.map((cid) => axios.get(`http://localhost:8080/ipfs/${cid}`))
   )
   return map('data', result)
}

export const generateMetadata = (tags: TagMetadata[]) => {
   const conflictedFields = new Set<string>()
   const conflictedTags = new Set<TagMetadata>()
   return {
      metadata: tags.slice(0).reduce(
         (result, tag) => {
            const fields = tag.metadataExtensions.fields.reduce((result, field) => {
               return {
                  ...result,
                  [field.name]: field.defaultValue,
               }
            }, {})

            const intersections = intersection(keys(fields), keys(result))
            if (intersections.length !== 0) {
               intersections.forEach((field) => {
                  conflictedFields.add(field)
               })

               conflictedTags.add(
                  find(
                     (tag) =>
                        intersection(map('name', tag.metadataExtensions.fields), intersections)
                           .length,
                     tags
                  ) as TagMetadata
               )
               conflictedTags.add(tag)

               return result
            }
            return {
               ...result,
               ...fields,
               description: result.description
                  ? `${result.description} | ${tag.description}`
                  : tag.description,
            }
         },
         { description: '' }
      ),
      conflictedFields: Array.from(conflictedFields.values()),
      conflictedTags: Array.from(conflictedTags.values()),
   }
}

export const isTagsEquals = (a: TagName[], b: TagName[]) => {
   const bSorted = b.slice().sort()
   return (
      a.length === b.length &&
      a
         .slice()
         .sort()
         .every(function (value, index) {
            return value === bSorted[index]
         })
   )
}
