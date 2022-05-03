import * as React from 'react'

import { Button } from 'components/button'
import { Modal } from 'components/modal'
import { useFormik } from 'formik'

import { TagMetadata } from '@asylum-ui/connection-library'

import { ReactComponent as EditIcon } from 'assets/svg/pen.svg'
import {
   InterpretationCreateForm,
   InterpretationFormValues,
   validateInterpretation,
} from 'modules/template/interpretation-create-form'
import { InterpretationWithMetadata } from 'types'

interface IProps {
   tags: TagMetadata[]
   interpretation?: InterpretationWithMetadata
   open: boolean
   onClose: () => void
}

export const EditInterpretationModal: React.FC<IProps> = ({
   interpretation,
   tags,
   open,
   onClose,
}) => {
   const formik = useFormik<InterpretationFormValues>({
      enableReinitialize: true,
      validateOnChange: true,
      initialValues: {
         tags,
         src: interpretation?.metadata.src || interpretation?.interpretation.src || '',
      },
      validate: validateInterpretation,
      onSubmit: async (values, { setSubmitting }) => {
         setSubmitting(true)
         try {
            console.log(values)
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
