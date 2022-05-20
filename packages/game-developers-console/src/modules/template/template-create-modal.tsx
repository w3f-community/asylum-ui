import * as React from 'react'

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
import { Button } from 'components/button'
import { Modal } from 'components/modal'
import { Tag } from 'components/tag'
import { Paragraph } from 'components/text/paragraph'
import {
   InterpretationCreateForm,
   InterpretationFormValues,
   validateInterpretation,
} from 'modules/template/interpretation-create-form'
import { TemplateCreateForm, validateTemplate } from 'modules/template/template-create-form'
import { useStore } from 'store'
import { generateMetadata } from 'utils'

interface IProps {
   open: boolean
   onClose?: () => void
}

export interface TemplateFormValues {
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

         if (!find({ id: 'default-view' }, values.tags)) {
            errors.tags =
               'Template should include at least one interpretation with "default-view" tag'
         }

         return { ...errors, ...validateTemplate(values), ...validateInterpretation(values) }
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
            <TemplateCreateForm formik={formik} />

            <Paragraph className="text-white mt-2 ml-1">
               You have to create at least one interpretation with tag{' '}
               <Tag className=" mx-[1px]">default-view</Tag>, which will be used for marketplace
               representation or inventory.
            </Paragraph>

            <InterpretationCreateForm formik={formik} />

            <Button variant="light" className="mt-7" onClick={formik.submitForm}>
               <PlusIcon className="fill-text-base w-4 h-4 inline-block mr-2" /> create template
            </Button>
         </div>
      </Modal>
   )
})
