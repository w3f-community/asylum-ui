import * as React from 'react'

import { observer } from 'mobx-react-lite'

import { Hr } from 'components/hr'
import { WalletConnect } from 'modules/wallet'
import { useStore } from 'store'
import { IComponentProps } from 'types'

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
