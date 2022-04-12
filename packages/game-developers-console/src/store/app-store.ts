import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { action, makeObservable, observable } from 'mobx'
import { GameObject } from 'types'

class AppStore {
   account: InjectedAccountWithMeta | null = null
   selectedGame: GameObject | null = null

   constructor() {
      makeObservable(this, {
         account: observable,
         selectedGame: observable,
         setAccount: action,
         setSelectedGame: action,
      })
   }

   setAccount(account: InjectedAccountWithMeta | null) {
      this.account = account
   }

   setSelectedGame(game: GameObject | null) {
      this.selectedGame = game
   }
}

export default new AppStore()
