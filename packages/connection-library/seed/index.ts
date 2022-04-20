import * as dotenv from 'dotenv'
import { AsylumApi } from '../src'
import { Keyring } from '@polkadot/api'
import { IAsylumApi } from '../dist'
import { games } from './mocks'
import { KeyringPair } from '@polkadot/keyring/types'

dotenv.config()

function toEntries<T>(a: T[]) {
   return a.map((value, index) => [index, value] as const)
}

const prepareSeeder = async (api: IAsylumApi): Promise<KeyringPair> => {
   const seeder = new Keyring({ type: 'sr25519' }).addFromUri(process.env.SEEDER_MNEMONIC || '')
   const alice = new Keyring({ type: 'sr25519' }).addFromUri('//Alice')

   await api
      .withCaller(alice)
      .signAndSendWrapped(api.polkadotApi.tx.balances.transfer(seeder.address, 10 ** 12))

   return seeder
}

const seed = async (api: IAsylumApi): Promise<void> => {
   try {
      console.log('Initializing games:')
      for (const [index] of toEntries(games)) {
         await api.createGame(index, api.caller?.address || '', 0)
         const gameCID = await api.uploadMetadata(games[index])
         await api.setGameMetadata(index, gameCID)
         console.log(await api.gameMetadataOf(index))
      }
   } catch (error) {
      console.error('Error: ' + error)
   }
}

AsylumApi.connect(process.env.ENDPOINT_URL || '')
   .then(async (api) => {
      await seed(api.withCaller(await prepareSeeder(api)))
      terminate(0)
   })
   .catch((err) => {
      console.error(err)
      terminate(1)
   })

const terminate = (exitCode: number): void => {
   process.exit(exitCode)
}

export {}
