import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { action, makeObservable, observable } from 'mobx'
import { GameMetadata } from '@asylum-ui/connection-library'
import { INetwork } from 'types'

class AppStore {
   account: InjectedAccountWithMeta | null = null
   selectedGame: GameMetadata | null = null
   network: INetwork | null = null
   isConnected: boolean = false

   constructor() {
      makeObservable(this, {
         account: observable,
         selectedGame: observable,
         network: observable,
         isConnected: observable,
         setAccount: action,
         setSelectedGame: action,
      })
   }

   clear() {
      this.selectedGame = null
      this.network = null
      this.isConnected = false
   }

   setAccount(account: InjectedAccountWithMeta | null) {
      this.account = account
   }

   setSelectedGame(game: GameMetadata | null) {
      this.selectedGame = game
   }

   setNetwork(network: INetwork | null) {
      this.network = network
   }

   setIsConnected(isConnected: boolean) {
      this.isConnected = isConnected
   }
}

export type IAppStore = typeof AppStore.prototype
export default new AppStore()
