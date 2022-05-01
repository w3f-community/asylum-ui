import * as React from 'react'

import { Button } from 'components/button'
import { InputField } from 'components/input-field'
import { Modal } from 'components/modal'
import { Paragraph } from 'components/text/paragraph'
import { useFormik } from 'formik'
import 'highlight.js/styles/github.css'
import { find, map } from 'lodash/fp'
import { observer } from 'mobx-react-lite'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { AsylumApi, CID, Interpretation } from '@asylum-ui/connection-library'

import { SubmittableResult } from '@polkadot/api'
import { fetchTags } from 'api'
import { ReactComponent as PlusIcon } from 'assets/svg/plus.svg'
import {
   InterpretationCreate,
   InterpretationFormValues,
} from 'modules/template/interpretation-create'
import { useStore } from 'store'
import { formatAddress, generateMetadata } from 'utils'

interface IProps {
   open: boolean
   onClose?: () => void
}

interface TemplateFormValues {
   name: string
   issuer: string
   description: string
}

interface CreateTemplateProps {
   name: string
   metadata: CID
   max: number
   interpretations: Interpretation[]
}

export const TemplateCreateModal: React.FC<IProps> = observer(({ open, onClose }) => {
   const store = useStore()
   const queryClient = useQueryClient()
   const { data: tags } = useQuery('tags', () => fetchTags())
   const mutation = useMutation(
      ({ name, metadata, max, interpretations }: CreateTemplateProps): Promise<SubmittableResult> =>
         AsylumApi.createTemplate(name, metadata, max, interpretations),
      {
         onSuccess: () => {
            queryClient.invalidateQueries('templates')
         },
      }
   )
   const defaultTag = find({ id: 'default-view' }, tags)

   const formik = useFormik<TemplateFormValues & InterpretationFormValues>({
      enableReinitialize: true,
      validateOnChange: true,
      initialValues: {
         name: '',
         issuer: store?.account?.address || '',
         description: '',
         tags: defaultTag ? [defaultTag] : [],
         src: null,
      },
      validate: (values) => {
         const errors: any = {}
         if (!values.name) {
            errors.name = 'Name is required'
         }
         if (!values.description) {
            errors.description = 'Description is required'
         }
         if (!find({ id: 'default-view' }, values.tags)) {
            errors.tags =
               'Template should include at least one interpretation with "default-view" tag'
         }
         if (values.tags.length) {
            const { conflictedFields, conflictedTags } = generateMetadata(values.tags)
            if (conflictedFields.length) {
               errors.tags = `Tags ${JSON.stringify(
                  map('id', conflictedTags)
               )} have conflicting metadata fields: ${JSON.stringify(conflictedFields)}`
            }
         }
         if (!values.src) {
            errors.src = 'Interpretation source is required'
         }
         return errors
      },
      onSubmit: async (values, { setSubmitting, resetForm }) => {
         setSubmitting(true)
         try {
            const templateMetadataCID = await AsylumApi.uploadMetadata({
               description: values.description,
            })
            const interpretationMetadataCID = await AsylumApi.uploadMetadata(
               generateMetadata(values.tags).metadata
            )

            await mutation.mutate(
               {
                  name: values.name,
                  metadata: templateMetadataCID,
                  max: 100,
                  interpretations: [
                     {
                        tags: map('id', values.tags),
                        interpretation: {
                           id: map('id', values.tags).join('-'),
                           src: values.src || '',
                           metadata: interpretationMetadataCID,
                        },
                     },
                  ],
               },
               {
                  onSuccess: () => {
                     toast.success(`Template "${values.name}" was created!`)
                     resetForm()
                     onClose && onClose()
                  },
                  onError: (error: any) => {
                     toast.error(error.message)
                  },
               }
            )
         } catch (e: any) {
            toast.error(e.message)
         } finally {
            setSubmitting(false)
         }
      },
   })

   return (
      <Modal
         open={open}
         onClose={() => {
            formik.resetForm()
            onClose && onClose()
         }}
         title="Create Template"
         className="text-white"
         maxWidth="2xl"
      >
         <div className="p-4 flex flex-col gap-4 pb-8">
            <div className="flex gap-4">
               <InputField
                  className="basis-8/12"
                  label="Name"
                  placeholder="Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  errorMessage={(formik.touched.name && formik.errors.name) as string}
               />
               <InputField
                  className="basis-4/12"
                  value={formatAddress(formik.values.issuer || '')}
                  label="Issuer"
                  placeholder="Issuer Address"
                  name="issuer"
                  disabled
               />
            </div>
            <InputField
               label="Description"
               placeholder="Description"
               name="description"
               type="textarea"
               rows={3}
               value={formik.values.description}
               onChange={formik.handleChange}
               errorMessage={(formik.touched.description && formik.errors.description) as string}
            />
            <Paragraph className="text-white mt-2 ml-1">
               You have to create at least one interpretation with tag{' '}
               <span className="bg-asylum-blue rounded-lg text-white py-1 px-2 mx-[1px]">
                  default-view
               </span>
               , which will be used for marketplace representation or inventory.
            </Paragraph>

            <InterpretationCreate formik={formik} />

            <Button variant="light" className="mt-7" onClick={formik.submitForm}>
               <PlusIcon className="fill-text-base w-4 h-4 inline-block mr-2" /> create template
            </Button>
         </div>
      </Modal>
   )
})
