import * as React from 'react'
import { Modal } from 'components/modal'
import { Paragraph } from 'components/text/paragraph'

interface IProps {
   open: boolean
   onClose?: () => void
}

export const TemplateCreateModal: React.FC<IProps> = ({ open, onClose }) => {
   return (
      <Modal open={open} onClose={onClose} title="Create Item Template" className="text-white">
         <Paragraph>TemplateCreateModal</Paragraph>
      </Modal>
   )
}
