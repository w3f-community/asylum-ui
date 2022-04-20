import { ReactComponent as WalletIcon } from 'assets/svg/wallet.svg'
import { Paragraph } from 'components/text/paragraph'
import * as React from 'react'

interface IProps {}

export const NotConnectedWallet: React.FC<IProps> = () => {
   return (
      <div className="flex flex-col items-center justify-center m-auto h-[80%]">
         <WalletIcon className="w-24 h-24 mb-6 fill-white" />
         <Paragraph className="text-white text-center mb-6">
            Please, connect your wallet to see associated games
         </Paragraph>
      </div>
   )
}
