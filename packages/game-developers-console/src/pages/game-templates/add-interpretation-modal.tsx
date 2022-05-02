import * as React from 'react'

import { Modal } from 'components/modal'
import { useFormik } from 'formik'
import { find, map } from 'lodash/fp'

import {
   InterpretationCreate,
   InterpretationFormValues,
} from 'modules/template/interpretation-create'
import { generateMetadata } from 'utils'

interface IProps {
   open: boolean
   onClose: () => void
}

export const AddInterpretationModal: React.FC<IProps> = ({ open, onClose }) => {
   const formik = useFormik<InterpretationFormValues>({
      enableReinitialize: true,
      validateOnChange: true,
      initialValues: {
         tags: [],
         src: null,
      },
      validate: (values) => {
         const errors: any = {}
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
         onClose={onClose}
         title="Add interpretation"
         className="text-white"
         maxWidth="2xl"
      >
         <div className="p-4 flex flex-col gap-4 pb-8">
            <InterpretationCreate formik={formik} />
         </div>
      </Modal>
   )
}
