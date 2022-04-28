import * as React from 'react'
import { useEffect } from 'react'
import { InputSelect } from 'components/input-select'
import { InputFileUpload } from 'components/input-file-upload'
import { InputLabel } from 'components/input-label'
import { ReactComponent as CopyIcon } from 'assets/svg/copy.svg'
import { ReactComponent as CheckmarkIcon } from 'assets/svg/checkmark.svg'
import { filter, find, findLast, flow, join, keys, map } from 'lodash/fp'
import hljs from 'highlight.js'
import { AsylumApi } from '@asylum-ui/connection-library'
import { FormikProps } from 'formik'

interface IProps {
   formik: FormikProps<any>
}

export const InterpretationCreate: React.FC<IProps> = ({ formik }) => {
   const [copied, setCopied] = React.useState(false)
   const tags = ['default-view', '2d-sprite', 'png', 'jpg', 'jpeg']
   const options = tags.map((value) => ({
      value,
      label: value,
   }))

   const tagsDescription: Record<string, string> = {
      'default-view': 'Default view representation of item',
      '2d-sprite': '2d sprite representation of item',
      png: 'in PNG format',
      jpg: 'in JPG format',
      jpeg: 'in JPEG format',
   }

   const metadata = {
      format: findLast(
         (tag: string) => ['png', 'jpg', 'jpeg'].includes(tag),
         map('value', formik.values.tags)
      ),
   }
   const generateDescription = () =>
      flow(
         keys,
         filter((tag) =>
            ['png', 'jpg', 'jpeg'].includes(tag)
               ? metadata.format === tag
               : !!find({ value: tag }, formik.values.tags)
         ),
         map((tag) => tagsDescription[tag]),
         join(' ')
      )(tagsDescription)

   const metadataFull = {
      src: formik.values.src,
      description: generateDescription(),
      metadata,
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
            defaultValue={[options[0]]}
            options={options}
         />
         <InputFileUpload
            name="source"
            label="Source"
            value={formik.values.src}
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
