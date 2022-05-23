import React from 'react'

import { useQuery } from 'react-query'

import { fetchTemplateWithMetadata } from '../../api'
import { Modal } from 'components/modal'

import { MintItemForm } from './mint-item-form'

interface IMintItemModal {
   templateId: string | null
   onClose: () => void
}

export const MintItemModal = ({ templateId, onClose }: IMintItemModal) => {
   const { data: template, isSuccess } = useQuery(
      ['template', templateId],
      () => fetchTemplateWithMetadata(templateId as string),
      {
         enabled: templateId !== null,
      }
   )

   return (
      <Modal title={'Mint Item'} open={templateId !== null} onClose={onClose}>
         {isSuccess && <MintItemForm template={template} onClose={onClose} />}
      </Modal>
   )
}
