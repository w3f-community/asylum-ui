import * as React from 'react'

import { observer } from 'mobx-react-lite'

import { AddressName } from '../components/address-name'
import { CopyAddressButton } from '../components/copy-address-button'
import { Button } from 'components/button'
import { useStore } from 'store'

import { IWalletStepProps, WalletConnectStepType } from './index'

export const ConnectedStep: React.FC<IWalletStepProps> = observer(({ nextStep, onClose }) => {
   const store = useStore()

   const handleChange = () => {
      nextStep(WalletConnectStepType.AccountSelection)
   }

   const handleDisconnect = () => {
      localStorage.clear()
      store.setAccount(null)
      onClose()
   }

   return (
      <>
         {store.account && (
            <div className="flex gap-4 mb-4">
               <AddressName name={store.account.meta.name} />
               <CopyAddressButton address={store.account.address} />
            </div>
         )}
         <Button variant="light" size="sm" className="w-full mt-4" onClick={handleChange}>
            change wallet
         </Button>
         <Button variant="dark" size="sm" className="w-full mt-4" onClick={handleDisconnect}>
            disconnect
         </Button>
      </>
   )
})
