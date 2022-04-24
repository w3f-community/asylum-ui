import * as React from 'react'
import { ReactComponent as PlusIcon } from 'assets/svg/plus.svg'
import { Button } from 'components/button'
import { TemplateCreateModal } from 'modules/template/template-create-modal'

export const TemplateCreate: React.FC = () => {
   const [open, setOpen] = React.useState(false)

   return (
      <>
         <Button variant="light" onClick={() => setOpen(true)}>
            <PlusIcon className="fill-text-base w-4 h-4 inline-block mr-1" />
            create template
         </Button>
         <TemplateCreateModal open={open} onClose={() => setOpen(false)} />
      </>
   )
}
