import React from 'react'

import { useFormik } from 'formik'
import { observer } from 'mobx-react-lite'

import { mintItemFromTemplate, uploadMetadata } from '../../api'
import { ReactComponent as PlusIcon } from '../../assets/svg/plus.svg'
import { Button } from '../../components/button'
import { InputField } from '../../components/input-field'
import { InputLabel } from '../../components/input-label'
import { JsonRaw } from '../../components/json-raw'
import { useStore } from '../../store'
import { formatAddress } from '../../utils'

interface IMintItemForm {
   template: any
   onClose: () => void
}

interface IMintItemFormValues {
   name: string
   issuer: string
   description: string
   owner: string
}

export const MintItemForm = observer(({ template, onClose }: IMintItemForm) => {
   const store = useStore()
   const formik = useFormik<IMintItemFormValues>({
      initialValues: {
         name: `${template.name} NFT`,
         issuer: template.issuer,
         description: template.description,
         owner: store.account?.address || '',
      },
      validate: (values) => {
         const errors: any = {}

         if (values.name === '') {
            errors.name = 'Name is required'
         }

         if (values.owner === '') {
            errors.owner = 'Owner is required'
         }

         return errors
      },
      onSubmit: async (values) => {
         try {
            const CID = await uploadMetadata(extendedMetaData)
            const result = await mintItemFromTemplate(values.owner, template.id, CID)
            console.log(result)
            onClose && onClose()
         } catch (error) {
            console.error(error)
         }
      },
   })

   const extendedMetaData = {
      name: formik.values.name,
      description: template.description,
   }

   return (
      <form className="p-4 flex flex-col gap-4 pb-8" onSubmit={formik.handleSubmit}>
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
            label="Owner"
            placeholder="owner"
            name="owner"
            value={formik.values.owner}
            onChange={formik.handleChange}
            errorMessage={(formik.touched.owner && formik.errors.owner) as string}
         />
         <div>
            <InputLabel className="mb-2">Raw Metadata</InputLabel>
            <JsonRaw metadata={extendedMetaData} />
         </div>
         <Button variant="light" className="mt-7" disabled={formik.isSubmitting}>
            <PlusIcon className="fill-text-base w-4 h-4 inline-block mr-2" /> Mint item
         </Button>
      </form>
   )
})
