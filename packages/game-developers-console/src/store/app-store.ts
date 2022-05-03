import { makeAutoObservable } from 'mobx'

import { Game, GameMetadata } from '@asylum-ui/connection-library'

import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { INetwork } from 'types'

export type GameWithMetadata = Game & GameMetadata

export interface RefetchOptions {
   refetch?: () => Promise<any>
}

class AppStore {
   account: InjectedAccountWithMeta | null = null
   selectedGame: GameWithMetadata | null = null
   network: INetwork | null = null
   isConnected: boolean = false

   constructor() {
      makeAutoObservable(this)
   }

   clear() {
      this.selectedGame = null
      this.network = null
      this.isConnected = false
   }

   setAccount(account: InjectedAccountWithMeta | null) {
      this.account = account
   }

   setSelectedGame(game: GameWithMetadata | null) {
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
