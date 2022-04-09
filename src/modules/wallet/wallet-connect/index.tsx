import { Button } from 'components/button'
import * as React from 'react'
import { useState } from 'react'
import { WalletConnectModal } from './wallet-connect-modal'
import { observer } from 'mobx-react-lite'
import { useStore } from 'store'
import { formatAddress, getRandomAvatar } from 'utils'
import { Avatar } from 'components/avatar'

interface IProps {}

export const WalletConnect: React.FC<IProps> = observer(() => {
   const store = useStore()
   const [isModalOpen, setIsModalOpen] = useState(false)

   const avatar = getRandomAvatar([], 9)

   return (
      <>
         {store.account ? (
            <div className="flex">
               {/* <Avatar className="mr-4" /> */}
               <div
                  className="content rounded-lg w-9 h-9 bg-gray-600 overflow-hidden bg-white mr-4"
                  dangerouslySetInnerHTML={{ __html: avatar }}
               ></div>
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
