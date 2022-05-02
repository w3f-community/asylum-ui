import * as React from 'react'
import { useEffect } from 'react'

import { InputFileUpload } from 'components/input-file-upload'
import { InputLabel } from 'components/input-label'
import { InputSelect } from 'components/input-select'
import { JsonRaw } from 'components/json-raw'
import { FormikProps } from 'formik'
import { omit } from 'lodash/fp'
import { useQuery } from 'react-query'
import { OptionProps, components } from 'react-select'

import { AsylumApi, CID, TagMetadata } from '@asylum-ui/connection-library'

import { fetchTags } from 'api'
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

   const handleSourceLoad = async (buffer: ArrayBuffer) => {
      const CID = await AsylumApi.uploadFile(buffer)
      await formik.setFieldValue('src', CID)
   }

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
            <JsonRaw metadata={metadataFull} />
         </div>
      </>
   )
}
