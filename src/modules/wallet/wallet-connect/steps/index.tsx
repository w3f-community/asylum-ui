import * as React from 'react'
import { ExtensionSelectionStep } from './extension-selection-step'
import { AccountSelectionStep } from './account-selection-step'
import { ConnectedStep } from './connected-step'

export enum WalletConnectStepType {
   ExtensionSelection,
   AccountSelection,
   Connected,
}

export interface IWalletStepProps {
   nextStep: (step: WalletConnectStepType) => void
   onClose: () => void
}

type WalletConnectStep = Record<WalletConnectStepType, (arg: IWalletStepProps) => React.ReactNode>

export const WALLET_CONNECT_STEPS: WalletConnectStep = {
   [WalletConnectStepType.ExtensionSelection]: (props: IWalletStepProps) => (
      <ExtensionSelectionStep {...props} />
   ),
   [WalletConnectStepType.AccountSelection]: (props: IWalletStepProps) => (
      <AccountSelectionStep {...props} />
   ),
   [WalletConnectStepType.Connected]: (props: IWalletStepProps) => <ConnectedStep {...props} />,
}
