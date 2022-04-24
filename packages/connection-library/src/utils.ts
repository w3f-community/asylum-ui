import { SubmittableResult } from '@polkadot/api'
import { Registry } from '@polkadot/types/types'
import { StorageKey } from '@polkadot/types'
import { AnyTuple, Codec } from '@polkadot/types-codec/types'

export const handleTxCallback =
   (
      resolve: (txResult: SubmittableResult) => void,
      reject: (txResult: string) => void,
      registry: Registry
   ) =>
   (result: SubmittableResult): void => {
      if (result.status.isFinalized || result.status.isInBlock) {
         result.events
            .filter(({ event: { section } }: any): boolean => section === 'system')
            .forEach((event: any): void => {
               const {
                  event: { data, method },
               } = event

               if (method === 'ExtrinsicFailed') {
                  const [dispatchError] = data
                  let message = dispatchError.type
                  if (dispatchError.isModule) {
                     const mod = dispatchError.asModule
                     const error = registry.findMetaError(
                        new Uint8Array([mod.index.toNumber(), mod.error.toNumber()])
                     )
                     message = `${error.section}.${error.name}${
                        Array.isArray(error.docs) ? `(${error.docs.join('')})` : error.docs || ''
                     }`
                  }
                  reject(message)
               } else if (method === 'ExtrinsicSuccess') {
                  resolve(result)
               }
            })
      } else if (result.isError) {
         reject(result.toString())
      }
   }

export const mapEntries = (entries: [StorageKey<AnyTuple>, Codec][]) => {
   return entries.map(([key, exposure]) => {
      const id = key.args.map((k) => k.toHuman())[0]
      // @ts-ignore
      return {
         ...exposure.toHuman(),
         id,
      }
   })
}
