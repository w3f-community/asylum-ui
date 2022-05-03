import * as React from 'react'
import { useEffect } from 'react'

import { IWalletStepProps, WalletConnectStepType } from './index'
import { web3Accounts, web3FromAddress } from '@polkadot/extension-dapp'
import { Avatar } from 'components/avatar'
import { Button } from 'components/button'
import { Paragraph } from 'components/text/paragraph'
import { observer } from 'mobx-react-lite'

import { AsylumApi } from '@asylum-ui/connection-library'

import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { useStore } from 'store'
import { formatAddress } from 'utils'

interface IAccountRowProps {
   account: InjectedAccountWithMeta
   onSelect: (account: InjectedAccountWithMeta) => void
}

const AccountRow: React.FC<IAccountRowProps> = ({ account, onSelect }) => (
   <Button
      key={account.address}
      variant="light"
      size="lg"
      className="w-full text-left flex items-center justify-between"
      onClick={() => onSelect(account)}
   >
      <span className="flex text-left flex items-center gap-4">
         <Avatar /> {account.meta.name}
      </span>
      {formatAddress(account.address)}
   </Button>
)

const AccountsEmpty: React.FC = () => (
   <Paragraph className="text-center">
      No accounts found. Please setup accounts and click refresh.
   </Paragraph>
)

export const AccountSelectionStep: React.FC<IWalletStepProps> = observer(
   ({ nextStep, onClose }) => {
      const store = useStore()
      const [accounts, setAccounts] = React.useState<InjectedAccountWithMeta[]>([])

      const handleConnect = async (account: InjectedAccountWithMeta) => {
         store.setSelectedGame(null)
         store.setAccount(account)
         const injector = await web3FromAddress(account.address)
         AsylumApi.withInjectedSigner(account.address, injector.signer)
         setTimeout(() => nextStep(WalletConnectStepType.Connected), 150)
         onClose()
      }

      const handleDisconnect = () => {
         localStorage.clear()
         nextStep(WalletConnectStepType.ExtensionSelection)
      }

      const fetchAccounts = async () => {
         const allAccounts = await web3Accounts()
         setAccounts(allAccounts)
      }

      useEffect(() => {
         fetchAccounts().catch(console.error)
      }, [])

      if (accounts.length === 0) {
         return (
            <>
               <AccountsEmpty />
               <Button variant="dark" size="sm" className="w-full mt-8" onClick={fetchAccounts}>
                  refresh
               </Button>
            </>
         )
      }

      return (
         <div className="flex flex-col gap-4">
            {accounts.map((account) => (
               <AccountRow key={account.address} account={account} onSelect={handleConnect} />
            ))}
            <Button variant="dark" size="sm" className="w-full mt-4" onClick={handleDisconnect}>
               disconnect
            </Button>
         </div>
      )
   }
)
