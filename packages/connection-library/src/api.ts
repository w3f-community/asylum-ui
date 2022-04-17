import { ApiPromise, SubmittableResult, WsProvider } from '@polkadot/api'
import { KeyringPair } from '@polkadot/keyring/types'
import { create } from 'ipfs-http-client'
import { handleTxCallback } from './utils'

class AsylumApi {
   api: ApiPromise | undefined
   caller: KeyringPair | undefined

   async load(network: string): Promise<AsylumApi> {
      this.api = await ApiPromise.create({ provider: new WsProvider(network) })
      return this
   }

   withCaller(caller: KeyringPair): AsylumApi {
      this.caller = caller
      return this
   }

   async uploadMetadata(metadata: object): Promise<string> {
      const ipfs = create({
         url: 'http://localhost:5001',
      })
      const { cid } = await ipfs.add(JSON.stringify(metadata))

      return `http://localhost:8080/ipfs/${cid.toString()}`
   }

   async createGame(id: number, accountId: string, price: number): Promise<SubmittableResult> {
      return new Promise((resolve, reject) => {
         this.api!.tx.asylumGDS.createGame(id, accountId, price).signAndSend(
            this.caller!,
            handleTxCallback(resolve, reject, this.api!.registry)
         )
      })
   }
}

export default new AsylumApi()
