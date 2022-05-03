import * as React from 'react'

import { Button } from 'components/button'
import { Modal } from 'components/modal'
import { useFormik } from 'formik'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import {
   AsylumApi,
   ChangeSet,
   TagMetadata,
   TemplateChangeModify,
   TemplateChangeModifyTags,
} from '@asylum-ui/connection-library'

import { SubmittableResult } from '@polkadot/api'
import { ReactComponent as EditIcon } from 'assets/svg/pen.svg'
import {
   InterpretationCreateForm,
   InterpretationFormValues,
   validateInterpretation,
} from 'modules/template/interpretation-create-form'
import { InterpretationWithMetadata, TemplateWithMetadata } from 'types'
import { generateMetadata, isTagsEquals } from 'utils'

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
   tags: TagMetadata[]
   interpretation?: InterpretationWithMetadata
   open: boolean
   onClose: () => void
}

export const EditInterpretationModal: React.FC<IProps> = ({
   template,
   tags,
   interpretation,
   open,
   onClose,
}) => {
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
            }, 400)
         },
      }
   )

   const formik = useFormik<InterpretationFormValues>({
      enableReinitialize: true,
      validateOnChange: true,
      initialValues: {
         tags,
         src: interpretation?.metadata.src || interpretation?.interpretation.src || '',
      },
      validate: validateInterpretation,
      onSubmit: async (values, { setSubmitting, resetForm }) => {
         setSubmitting(true)
         try {
            console.log(values)
            if (!values.src) throw new Error("Interpretation's src can not be empty!")

            const newMetadata = generateMetadata(values.tags).metadata
            const newMetadataCID = await AsylumApi.getMetadataCID(newMetadata)

            const oldInterpretationInfo = interpretation?.interpretation

            const changeSet = [] as ChangeSet

            if (
               newMetadataCID !== oldInterpretationInfo?.metadata ||
               values.src !== oldInterpretationInfo.src
            ) {
               await AsylumApi.uploadMetadata(newMetadata)

               changeSet.push(
                  new TemplateChangeModify([
                     {
                        id: oldInterpretationInfo!.id,
                        src: values.src,
                        metadata: newMetadataCID,
                     },
                  ])
               )
            }
            if (
               !isTagsEquals(
                  values.tags.map((i) => i.id),
                  tags.map((i) => i.id)
               )
            ) {
               changeSet.push(
                  new TemplateChangeModifyTags(
                     oldInterpretationInfo!.id,
                     values.tags.map((i) => i.id)
                  )
               )
            }

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
                     toast.success('The interpretation was successfully edited!')
                     resetForm()
                     onClose && onClose()
                  },
                  onError: (error: any) => {
                     toast.error(error.message)
                  },
               }
            )
         } finally {
            setSubmitting(false)
         }
      },
   })

   return (
      <Modal
         open={open}
         onClose={() => {
            onClose()
            formik.resetForm()
         }}
         title="Edit interpretation"
         className="text-white"
         maxWidth="2xl"
      >
         <div className="p-4 flex flex-col gap-4 pb-8">
            <InterpretationCreateForm formik={formik} />
            <Button variant="light" className="mt-7" onClick={formik.submitForm}>
               <EditIcon className="group-hover:fill-white inline-block mr-2" /> edit interpretation
            </Button>
         </div>
      </Modal>
   )
}
