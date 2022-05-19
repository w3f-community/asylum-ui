import { apiTypes } from './api-types'
import { ChangeSet, Game, GameMetadata, Interpretation, Tag, TagName, Template } from './types'
import { handleTxCallback, mapEntries } from './utils'
import { ApiPromise, SubmittableResult, WsProvider } from '@polkadot/api'
import { ApiTypes } from '@polkadot/api-base/types/base'
import { SubmittableExtrinsic } from '@polkadot/api-base/types/submittable'
import { Signer } from '@polkadot/api/types'
import { KeyringPair } from '@polkadot/keyring/types'
import { create } from 'ipfs-http-client'
import { omit } from 'lodash/fp'

class AsylumApi {
   api: ApiPromise | undefined
   keyringPair: KeyringPair | undefined
   address: string | undefined
   injectedSigner: Signer | undefined

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
            types: apiTypes,
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

   withKeyringPair(keyringPair: KeyringPair): AsylumApi {
      this.keyringPair = keyringPair
      return this
   }

   withInjectedSigner(address: string, signer: Signer): AsylumApi {
      this.address = address
      this.injectedSigner = signer
      return this
   }

   async uploadMetadata(metadata: object): Promise<string> {
      const ipfs = create({
         url: process.env.IPFS_ENDPOINT_URL ?? 'http://127.0.0.1:5001',
      })
      const { cid } = await ipfs.add(JSON.stringify(metadata))

      return cid.toString()
   }

   async getMetadataCID(metadata: object): Promise<string> {
      const ipfs = create({
         url: process.env.IPFS_ENDPOINT_URL ?? 'http://127.0.0.1:5001',
      })
      const { cid } = await ipfs.add(JSON.stringify(metadata), { onlyHash: true })

      return cid.toString()
   }

   async uploadFile(buffer: ArrayBuffer): Promise<string> {
      const ipfs = create({
         url: process.env.IPFS_ENDPOINT_URL ?? 'http://127.0.0.1:5001',
      })
      const { cid } = await ipfs.add(buffer)

      return cid.toString()
   }

   signAndSendWrapped<ApiType extends ApiTypes>(
      tx: SubmittableExtrinsic<ApiType>
   ): Promise<SubmittableResult> {
      return new Promise((resolve, reject) => {
         try {
            if (this.keyringPair) {
               tx.signAndSend(
                  this.keyringPair!,
                  handleTxCallback(resolve, reject, this.api!.registry)
               )
            } else if (this.injectedSigner && this.address) {
               tx.signAndSend(
                  this.address,
                  { signer: this.injectedSigner },
                  handleTxCallback(resolve, reject, this.api!.registry)
               )
            } else {
               reject(new Error('No keyringPair or injectedSigner provided'))
            }
         } catch (e) {
            reject(e)
         }
      })
   }

   async createGame(id: number, admins: string[], price: number): Promise<SubmittableResult> {
      return this.signAndSendWrapped(this.api!.tx.asylumGDS.createGame(id, admins, price))
   }

   async setGameMetadata(
      id: number,
      cid: string,
      title: string,
      genre: string
   ): Promise<SubmittableResult> {
      return this.signAndSendWrapped(this.api!.tx.asylumGDS.setGameMetadata(id, cid, title, genre))
   }

   async addTemplateSupport(gameId: string, templateId: number): Promise<SubmittableResult> {
      return this.signAndSendWrapped(this.api!.tx.asylumGDS.addTemplateSupport(gameId, templateId))
   }

   async games(): Promise<Game[]> {
      const entries = await this.api!.query.asylumGDS.game.entries()
      return mapEntries(entries)
   }

   async game(id: number): Promise<Game> {
      const game = await this.api!.query.asylumGDS.game(id)
      // @ts-ignore
      return game.toHuman()
   }

   async gameMetadataOf(id: number): Promise<GameMetadata> {
      const result = await this.api!.query.asylumGDS.gameMetadataOf(id)
      // @ts-ignore
      return result.toHuman()
   }

   async tickets(): Promise<any[]> {
      const entries = await this.api!.query.asylumGDS.ticket.entries()
      return mapEntries(entries)
   }

   async nextProposalId(): Promise<number> {
      // @ts-ignore
      return (await this.api!.query.asylumCore.nextProposalId()).toNumber()
   }

   async submitTemplateChangeProposal(
      author: string,
      templateId: number,
      changeSet: ChangeSet
   ): Promise<SubmittableResult> {
      return this.signAndSendWrapped(
         this.api!.tx.asylumCore.submitTemplateChangeProposal(
            author,
            templateId,
            changeSet.map((x) => x.convert(this.api!))
         )
      )
   }

   async proposals(): Promise<any[]> {
      const entries = await this.api!.query.asylumCore.proposals.entries()
      return mapEntries(entries)
   }

   async tags(): Promise<Tag[]> {
      const entries = await this.api!.query.asylumCore.tags.entries()
      return mapEntries(entries)
   }

   async tagMetadataOf(id: string): Promise<any> {
      const result = await this.api!.query.asylumCore.tags(id)
      return result.toHuman()
   }

   async templateInterpretations(id: string): Promise<Interpretation[]> {
      const result = await this.api!.query.asylumCore.templateIntepretations.entries(id)
      return mapEntries(result, (i) => {
         const json = i.toHuman()
         return {
            // @ts-ignore
            interpretation: json['0'],
            // @ts-ignore
            tags: json['1'],
         }
      })
   }

   async itemInterpretations(id: number): Promise<Interpretation[]> {
      const result = await this.api!.query.asylumCore.itemIntepretations.entries(id)
      return mapEntries(result, (i) => {
         const json = i.toHuman()
         return {
            // @ts-ignore
            interpretation: json['0'],
            // @ts-ignore
            tags: json['1'],
         }
      })
   }

   async createInterpretationTag(tag: TagName, metadata: string): Promise<SubmittableResult> {
      const tx = this.api!.tx.asylumCore.createInterpretationTag(tag, metadata)
      return this.signAndSendWrapped(tx)
   }

   async createTemplate(
      templateName: string,
      metadata: string,
      max: number | undefined,
      interpretations: Interpretation[]
   ): Promise<SubmittableResult> {
      const tx = this.api!.tx.asylumCore.createTemplate(
         templateName,
         metadata,
         max,
         interpretations
      )
      return this.signAndSendWrapped(tx)
   }

   async updateTemplate(templateId: number, proposalId: number): Promise<SubmittableResult> {
      return this.signAndSendWrapped(this.api!.tx.asylumCore.updateTemplate(templateId, proposalId))
   }

   async template(id: string): Promise<Template> {
      const template: any = (await this.api!.query.rmrkCore.collections(id)).toHuman()
      return {
         ...omit('symbol', template),
         id,
         name: template.symbol,
      } as Template
   }

   async templates(): Promise<Template[]> {
      const entries = await this.api!.query.rmrkCore.collections.entries()
      return mapEntries(entries, (data) => {
         const json = data.toHuman() as any
         return {
            ...omit('symbol', json),
            name: json.symbol,
         }
      })
   }

   async mintItem(
      owner: string,
      templateId: string,
      metadata: string
   ): Promise<SubmittableResult> {
      const tx = this.api!.tx.asylumCore.mintItemFromTemplate(
         owner, templateId, metadata,
      )
      return this.signAndSendWrapped(tx)
   }
}

export default new AsylumApi()
