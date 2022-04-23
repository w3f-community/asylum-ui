import { ApiPromise, SubmittableResult, WsProvider } from '@polkadot/api'
import { KeyringPair } from '@polkadot/keyring/types'
import { create } from 'ipfs-http-client'
import { handleTxCallback } from './utils'
import { SubmittableExtrinsic } from '@polkadot/api-base/types/submittable'
import { ApiTypes } from '@polkadot/api-base/types/base'
import { Game, GameMetadata } from './types'

class AsylumApi {
   api: ApiPromise | undefined
   caller: KeyringPair | undefined

   async connect(
      endpoint: string,
      onConnected?: () => void,
      onDisconnected?: () => void
   ): Promise<AsylumApi> {
      const provider = new WsProvider(endpoint)
      onConnected && provider.on('connected', onConnected)
      onDisconnected && provider.on('disconnected', onDisconnected)

      try {
         this.api = await ApiPromise.create({
            provider,
            throwOnConnect: true,
            throwOnUnknown: true,
         })
      } catch (e) {
         await provider.disconnect()
         throw e
      }

      return this
   }

   async disconnect(): Promise<void> {
      if (this.api) {
         await this.api.disconnect()
      }
   }

   get polkadotApi(): ApiPromise {
      if (!this.api) {
         throw new Error('Api is not loaded')
      }
      return this.api
   }

   withCaller(caller: KeyringPair): AsylumApi {
      this.caller = caller
      return this
   }

   async uploadMetadata(metadata: object): Promise<string> {
      const ipfs = create({
         url: 'http://127.0.0.1:5001',
      })
      const { cid } = await ipfs.add(JSON.stringify(metadata))

      return cid.toString()
   }

   signAndSendWrapped<ApiType extends ApiTypes>(
      tx: SubmittableExtrinsic<ApiType>
   ): Promise<SubmittableResult> {
      return new Promise((resolve, reject) => {
         tx.signAndSend(this.caller!, handleTxCallback(resolve, reject, this.api!.registry))
      })
   }

   async createGame(id: number, accountId: string, price: number): Promise<SubmittableResult> {
      return this.signAndSendWrapped(this.api!.tx.asylumGDS.createGame(id, accountId, price))
   }

   async setGameMetadata(
      id: number,
      cid: string,
      title: string,
      genre: string
   ): Promise<SubmittableResult> {
      return this.signAndSendWrapped(this.api!.tx.asylumGDS.setGameMetadata(id, cid, title, genre))
   }

   async games(): Promise<Game[]> {
      const entries = await this.api!.query.asylumGDS.game.entries()
      return entries.map(([key, exposure]) => {
         const id = key.args.map((k) => k.toHuman())[0]
         // @ts-ignore
         return { ...exposure.toHuman(), id }
      })
   }

   async gameMetadataOf(id: number): Promise<GameMetadata> {
      const result = await this.api!.query.asylumGDS.gameMetadataOf(id)
      // @ts-ignore
      return result.toHuman()
   }

   async tickets(): Promise<any[]> {
      const entries = await this.api!.query.asylumGDS.ticket.entries()
      return entries.map(([key, exposure]) => {
         const id = key.args.map((k) => k.toHuman())[0]
         // @ts-ignore
         return { ...exposure.toHuman(), id }
      })
   }
}

export default new AsylumApi()
