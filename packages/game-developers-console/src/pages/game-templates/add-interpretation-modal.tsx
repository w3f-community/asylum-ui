import * as React from 'react'

import { Button } from 'components/button'
import { Modal } from 'components/modal'
import { useFormik } from 'formik'
import { map } from 'lodash/fp'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { AsylumApi, ChangeSet, TemplateChangeAdd } from '@asylum-ui/connection-library'

import { SubmittableResult } from '@polkadot/api'
import { ReactComponent as PlusIcon } from 'assets/svg/plus.svg'
import {
   InterpretationCreateForm,
   InterpretationFormValues,
   validateInterpretation,
} from 'modules/template/interpretation-create-form'
import { TemplateWithMetadata } from 'types'
import { generateMetadata } from 'utils'

interface SubmitTemplateChangeProposalProps {
   author: string
   templateId: number
   changeSet: ChangeSet
}

interface TemplateUpdateProps {
   templateId: number
   proposalId: number
}

interface IProps {
   template: TemplateWithMetadata
   open: boolean
   onClose: () => void
}

export const AddInterpretationModal: React.FC<IProps> = ({ template, open, onClose }) => {
   const queryClient = useQueryClient()

   const mutation = useMutation(
      ({
         author,
         templateId,
         changeSet,
      }: SubmitTemplateChangeProposalProps): Promise<SubmittableResult> =>
         AsylumApi.submitTemplateChangeProposal(author, templateId, changeSet)
   )

   const templateUpdateMutation = useMutation(
      ({ templateId, proposalId }: TemplateUpdateProps): Promise<SubmittableResult> =>
         AsylumApi.updateTemplate(templateId, proposalId),
      {
         onSuccess: async () => {
            setTimeout(() => {
               queryClient.invalidateQueries(['interpretations', template.id])
               queryClient.invalidateQueries(['templates', template.id])
            }, 1000)
         },
      }
   )

   const formik = useFormik<InterpretationFormValues>({
      enableReinitialize: true,
      validateOnChange: true,
      initialValues: {
         tags: [],
         src: null,
      },
      validate: validateInterpretation,
      onSubmit: async (values, { setSubmitting, resetForm }) => {
         setSubmitting(true)

         try {
            if (!values.src) throw new Error("Interpretation's src can not be empty!")

            const metadata = generateMetadata(values.tags).metadata
            const metadataCID = await AsylumApi.uploadMetadata(metadata)

            const changeSet = [
               new TemplateChangeAdd([
                  {
                     tags: values.tags.map((i) => i.id),
                     interpretation: {
                        id: map('id', values.tags).join('-'),
                        src: values.src,
                        metadata: metadataCID,
                     },
                  },
               ]),
            ]

            // temporary hack, remove before go to prod
            const proposalId = await AsylumApi.nextProposalId()

            const templateId = parseInt(template.id)

            await mutation.mutateAsync(
               {
                  author: AsylumApi.address || '',
                  templateId,
                  changeSet,
               },
               {
                  onError: (error: any) => {
                     toast.error(error.message)
                  },
               }
            )

            await templateUpdateMutation.mutateAsync(
               {
                  templateId,
                  proposalId,
               },
               {
                  onSuccess: async () => {
                     toast.success('The interpretation was successfully added!')
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
         title="Add interpretation"
         className="text-white"
         maxWidth="2xl"
      >
         <div className="p-4 flex flex-col gap-4 pb-8">
            <InterpretationCreateForm formik={formik} />
            <Button variant="light" className="mt-7" onClick={formik.submitForm}>
               <PlusIcon className="fill-text-base w-4 h-4 inline-block mr-2" /> add interpretation
            </Button>
         </div>
      </Modal>
   )
}
