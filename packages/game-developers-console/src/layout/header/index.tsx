import * as React from 'react'
import { Hr } from 'components/hr'
import { IComponentProps } from 'types'
import { WalletConnect } from 'modules/wallet'
import { observer } from 'mobx-react-lite'
import { useStore } from 'store'

interface IProps extends IComponentProps {}

export const Header: React.FC<IProps> = observer(() => {
   const store = useStore()
   return (
      <header>
         <div className="container mx-auto flex justify-end">
            <div className="w12">
               <div className="mb-4">
                  <WalletConnect />
               </div>
               <Hr active={Boolean(store.account)} />
            </div>
         </div>
      </header>
   )
})
