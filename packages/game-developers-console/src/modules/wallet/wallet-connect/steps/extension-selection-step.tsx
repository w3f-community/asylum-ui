import * as React from 'react'

import { IWalletStepProps, WalletConnectStepType } from './index'
import { web3Enable } from '@polkadot/extension-dapp'
import { Button } from 'components/button'
import { Paragraph } from 'components/text/paragraph'

import { ReactComponent as ArrowRightIcon } from 'assets/svg/arrow-right.svg'
import { ReactComponent as PolkadotIcon } from 'assets/svg/polkadot.svg'

export const ExtensionSelectionStep: React.FC<IWalletStepProps> = ({ nextStep }) => {
   const [error, setError] = React.useState(false)

   const handleConnect = async () => {
      setError(false)
      const extensions = await web3Enable('Asylum')
      if (extensions.length !== 0) {
         nextStep(WalletConnectStepType.AccountSelection)
      } else {
         setError(true)
      }
   }

   return (
      <>
         <Button
            variant="light"
            size="lg"
            className="w-full text-left flex items-center justify-between"
            onClick={handleConnect}
            error={error}
         >
            <span className="flex text-left items-center gap-4">
               <PolkadotIcon /> {'Polkadot{.js}'}
            </span>
            <ArrowRightIcon className="justify-self-end group-hover:fill-white" />
         </Button>
         {error && (
            <Paragraph className="text-center text-red-400 mt-7">
               {'Failed to connect with PolkadotJS extension. Please try again.'}
            </Paragraph>
         )}
      </>
   )
}
