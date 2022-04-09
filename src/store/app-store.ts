import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { action, makeObservable, observable } from 'mobx'

class AppStore {
   account: InjectedAccountWithMeta | null = null

   constructor() {
      makeObservable(this, {
         account: observable,
         setAccount: action,
      })
   }

   setAccount(account: InjectedAccountWithMeta | null) {
      this.account = account
   }
}

export default new AppStore()
