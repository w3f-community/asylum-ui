import * as React from 'react'

import { observer } from 'mobx-react-lite'

import { Modal } from 'components/modal'
import { useStore } from 'store'

import { WALLET_CONNECT_STEPS, WalletConnectStepType } from './steps'

interface IProps {
   open?: boolean
   onClose?: () => void
}

export const WalletConnectModal: React.FC<IProps> = observer(({ open, onClose }) => {
   const store = useStore()
   const [step, nextStep] = React.useState<WalletConnectStepType>(
      store.account ? WalletConnectStepType.Connected : WalletConnectStepType.ExtensionSelection
   )

   const handleClose = () => {
      onClose && onClose()
      if (!store.account) {
         setTimeout(() => nextStep(WalletConnectStepType.ExtensionSelection), 500)
      }
   }

   return (
      <Modal open={open} title="Connect Wallet" onClose={handleClose}>
         <div className="p-7">
            {WALLET_CONNECT_STEPS[step]({
               nextStep,
               onClose: handleClose,
            })}
         </div>
      </Modal>
   )
})
