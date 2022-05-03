import * as React from 'react'
import { useState } from 'react'

import { WalletConnectModal } from './wallet-connect-modal'
import { Avatar } from 'components/avatar'
import { Button } from 'components/button'
import { observer } from 'mobx-react-lite'

import { useStore } from 'store'
import { formatAddress } from 'utils'

interface IProps {}

export const WalletConnect: React.FC<IProps> = observer(() => {
   const store = useStore()
   const [isModalOpen, setIsModalOpen] = useState(false)

   return (
      <>
         {store.account ? (
            <div className="flex">
               <Avatar className="mr-4" />
               <Button variant="dark" size="sm" onClick={() => setIsModalOpen(!isModalOpen)}>
                  {formatAddress(store.account.address)}
               </Button>
            </div>
         ) : (
            <Button variant="dark" size="sm" onClick={() => setIsModalOpen(!isModalOpen)}>
               connect wallet
            </Button>
         )}

         <WalletConnectModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
   )
})
