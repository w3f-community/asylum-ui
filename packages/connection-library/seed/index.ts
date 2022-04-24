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
   console.log('Starting seed...')

   await seedTags(api)
   await seedGames(api)
   await seedTemplates(api)

   console.log('Seed finished')
}

const seedTags = async (api: IAsylumApi): Promise<void> => {
   try {
      console.log('Initializing tags...')

      // TODO
      await api.createInterpretationTag('odin', 'dwa')
      console.log(await api.tagMetadataOf('odin'))

      console.log('[Initializing tags] SUCCEED')
   } catch (error) {
      console.error('[Initializing tags] FAILED')
      console.error('[Initializing tags] Error: ' + error)
   }
}

const seedTemplates = async (api: IAsylumApi): Promise<void> => {
   try {
      console.log('Initializing templates...')

      // TODO
      await api.createTemplate('template_n', '', 10, [
         {
            tags: ['odin'],
            interpretation: {
               id: 12,
               src: '4444',
               metadata: '3232',
            },
         },
      ])

      console.log(await api.templateInterpretations(0))

      console.log('[Initializing templates] SUCCEED')
   } catch (error) {
      console.error('[Initializing templates] FAILED')
      console.error('[Initializing templates] Error: ' + error)
   }
}

const seedGames = async (api: IAsylumApi): Promise<void> => {
   try {
      console.log('Initializing games...')

      for (const [index] of toEntries(games)) {
         await api.createGame(index, api.caller?.address || '', 0)
         const gameCID = await api.uploadMetadata(games[index])
         await api.setGameMetadata(index, gameCID, games[index].title, games[index].genre)
         console.log(await api.gameMetadataOf(index))
      }

      console.log('[Initializing games] SUCCEED')
   } catch (error) {
      console.error('[Initializing games] FAILED')
      console.error('[Initializing games] Error: ' + error)
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
