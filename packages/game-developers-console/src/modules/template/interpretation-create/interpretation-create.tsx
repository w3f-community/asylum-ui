import * as React from 'react'
import { useEffect } from 'react'

import { InputFileUpload } from 'components/input-file-upload'
import { InputLabel } from 'components/input-label'
import { InputSelect } from 'components/input-select'
import { FormikProps } from 'formik'
import hljs from 'highlight.js'
import { omit } from 'lodash/fp'
import { observer } from 'mobx-react-lite'
import { useQuery } from 'react-query'
import { OptionProps, components } from 'react-select'

import { AsylumApi, CID, TagMetadata } from '@asylum-ui/connection-library'

import { fetchTags } from 'api'
import { ReactComponent as CheckmarkIcon } from 'assets/svg/checkmark.svg'
import { ReactComponent as CopyIcon } from 'assets/svg/copy.svg'
import { useStore } from 'store'
import { generateMetadata } from 'utils'

interface IProps<T extends InterpretationFormValues> {
   formik: FormikProps<T>
}

export interface InterpretationFormValues {
   tags: TagMetadata[]
   src: CID | null
}

const Option = (props: OptionProps<TagMetadata, true>) => {
   return (
      <components.Option {...props}>
         {props.label} <span className="text-gray-400">- {props.data.description}</span>
      </components.Option>
   )
}

export const InterpretationCreate = <T extends InterpretationFormValues>({ formik }: IProps<T>) => {
   const { data: tags } = useQuery('tags', () => fetchTags())
   const [copied, setCopied] = React.useState(false)
   const [metadata, setMetadata] = React.useState<any>({})

   useEffect(() => {
      if (formik.values.tags) {
         setMetadata(generateMetadata(formik.values.tags).metadata)
      }
   }, [formik.values.tags])

   const metadataFull = {
      src: formik.values.src,
      metadata: omit(['conflictedTags', 'conflictedFields'], metadata),
   }
   const metadataHtml = hljs.highlight('json', JSON.stringify(metadataFull, null, 2)).value

   const handleSourceLoad = async (buffer: ArrayBuffer) => {
      const CID = await AsylumApi.uploadFile(buffer)
      await formik.setFieldValue('src', CID)
   }

   const copiedMessage = copied ? 'copied' : 'copy'
   const copiedIcon = copied ? <CheckmarkIcon /> : <CopyIcon />

   useEffect(() => {
      setCopied(false)
   }, [formik.values])

   return (
      <>
         <InputSelect
            placeholder="Select tags"
            name="tags"
            value={formik.values.tags}
            onChange={(value) => formik.setFieldValue('tags', value)}
            options={tags || []}
            getOptionLabel={(option) => option.id}
            getOptionValue={(option) => option.id}
            errorMessage={formik.errors.tags as string}
            Option={Option}
         />
         <InputFileUpload
            accept="image/*"
            name="source"
            label="Source"
            value={formik.values.src || undefined}
            errorMessage={(formik.touched.src && formik.errors.src) as string}
            onLoad={handleSourceLoad}
         />
         <div>
            <InputLabel className="mb-2">Raw Metadata</InputLabel>
            <div className="bg-white text-gray-700 p-4 text-sm rounded-xl relative">
               <div
                  className="flex gap-3 items-center basis-48 !absolute top-2 right-3 hover:bg-gray-200 cursor-pointer py-2 px-4 rounded-xl transition-all text-base flex items-center gap-2 font-secondary"
                  onClick={() => {
                     navigator.clipboard.writeText(JSON.stringify(metadataFull, null, 2))
                     setCopied(true)
                  }}
               >
                  {copiedIcon} {copiedMessage}
               </div>
               <pre
                  className="hljs-json overflow-auto"
                  dangerouslySetInnerHTML={{ __html: metadataHtml }}
               />
            </div>
         </div>
      </>
   )
}
