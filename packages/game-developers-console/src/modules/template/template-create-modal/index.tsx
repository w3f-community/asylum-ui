import * as React from 'react'
import { Modal } from 'components/modal'
import { InputField } from 'components/input-field'
import { useFormik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useStore } from 'store'
import { formatAddress } from 'utils'
import { Paragraph } from 'components/text/paragraph'
import 'highlight.js/styles/github.css'
import { InterpretationCreate } from 'modules/template/interpretation-create'

interface IProps {
   open: boolean
   onClose?: () => void
}

export const TemplateCreateModal: React.FC<IProps> = observer(({ open, onClose }) => {
   const store = useStore()

   const tags = ['default-view', '2d-sprite', 'png', 'jpg', 'jpeg']
   const options = tags.map((value) => ({
      value,
      label: value,
   }))

   const formik = useFormik({
      initialValues: {
         name: '',
         issuer: store?.account?.address,
         description: '',
         tags: [options[0]] as { value: string; label: string }[],
         src: null,
      },
      onSubmit: (values) => {
         console.log(values)
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
            />
            <Paragraph className="text-white mt-2 ml-1">
               You have to create at least one interpretation with tag{' '}
               <span className="bg-asylum-blue rounded-lg text-white py-1 px-2 mx-[1px]">
                  default-view
               </span>
               , which will be used for marketplace representation or inventory.
            </Paragraph>

            <InterpretationCreate formik={formik} />
         </div>
      </Modal>
   )
})
