import * as React from 'react'

import { useFormik } from 'formik'

import { ReactComponent as EditIcon } from 'assets/svg/pen.svg'
import { Button } from 'components/button'
import { Modal } from 'components/modal'
import { TemplateCreateForm, validateTemplate } from 'modules/template/template-create-form'
import { TemplateFormValues } from 'modules/template/template-create-modal'
import { TemplateWithMetadata } from 'types'

interface IProps {
   template: TemplateWithMetadata
   open: boolean
   onClose: () => void
}

export const EditTemplateModal: React.FC<IProps> = ({ template, open, onClose }) => {
   const formik = useFormik<TemplateFormValues>({
      enableReinitialize: true,
      validateOnChange: true,
      initialValues: {
         name: template.name,
         issuer: template.issuer,
         description: template.description,
      },
      validate: validateTemplate,
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
         title="Edit template"
         className="text-white"
         maxWidth="2xl"
      >
         <div className="p-4 flex flex-col gap-4 pb-8">
            <TemplateCreateForm formik={formik} />
            <Button variant="light" className="mt-7" onClick={formik.submitForm}>
               <EditIcon className="group-hover:fill-white inline-block mr-2" /> edit template
            </Button>
         </div>
      </Modal>
   )
}
