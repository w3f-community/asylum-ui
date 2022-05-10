import * as React from 'react'

import { InputField } from 'components/input-field'
import { FormikProps } from 'formik'

import { TemplateFormValues } from 'modules/template/template-create-modal'
import { formatAddress } from 'utils'

interface IProps<T> {
   formik: FormikProps<T>
}

export const validateTemplate = (values: TemplateFormValues) => {
   const errors: Partial<TemplateFormValues> = {}

   if (!values.name) {
      errors.name = 'Name is required'
   }

   if (!values.description) {
      errors.description = 'Description is required'
   }

   return errors
}

export const TemplateCreateForm = <T extends TemplateFormValues>({ formik }: IProps<T>) => {
   return (
      <>
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
               defaultValue={formatAddress(formik.values.issuer || '')}
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
      </>
   )
}
