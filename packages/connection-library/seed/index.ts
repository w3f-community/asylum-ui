import * as dotenv from 'dotenv'
import { AsylumApi, Interpretation } from '../src'
import { Keyring } from '@polkadot/api'
import { IAsylumApi } from '../dist'
import {
   games as gamesMockData,
   tags as tagsMockData,
   templates as templatesMockData,
   proposals as proposalsMockData,
} from './mocks'
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
   await seedTemplates(api)
   await seedProposals(api)
   await seedGames(api)

   console.log('Seed finished')
}

const seedProposals = async (api: IAsylumApi): Promise<void> => {
   try {
      console.log('Initializing proposals...')

      for (const [index] of toEntries(proposalsMockData)) {
         const entry = proposalsMockData[index]

         await api.submitTemplateChangeProposal(entry.author, entry.templateId, entry.changeSet)

         console.log(`Added proposal for template: '${entry.templateId}'`)
      }

      console.log(await api.proposals())
      console.log('[Initializing proposals] SUCCEED')
   } catch (error) {
      console.error('[Initializing proposals] FAILED')
      console.error('[Initializing proposals] Error: ' + error)
   }
}

const seedTags = async (api: IAsylumApi): Promise<void> => {
   try {
      console.log('Initializing tags...')

      for (const [index] of toEntries(tagsMockData)) {
         const entry = tagsMockData[index]

         const metadataCID = await api.uploadMetadata(entry.metadata)
         await api.createInterpretationTag(entry.tag, metadataCID)

         console.log(`Added tag '${entry.tag}' with metadata:`)
         console.log(await api.tagMetadataOf(entry.tag))
      }

      console.log('[Initializing tags] SUCCEED')
   } catch (error) {
      console.error('[Initializing tags] FAILED')
      console.error('[Initializing tags] Error: ' + error)
   }
}

const seedTemplates = async (api: IAsylumApi): Promise<void> => {
   try {
      console.log('Initializing templates...')

      for (const [index] of toEntries(templatesMockData)) {
         const entry = templatesMockData[index]

         const templateMetadataCID = await api.uploadMetadata(entry.metadata)

         const interpretations: Interpretation[] = []

         for (const [index] of toEntries(entry.interpretations)) {
            const interpretationEntry = entry.interpretations[index]

            const metadataCID = await api.uploadMetadata(
               interpretationEntry.interpretation.metadata
            )
            // temporary solution, in the future we should upload file to ipfs and paste a hash here
            const srcCID = interpretationEntry.interpretation.src

            interpretations[index] = {
               tags: interpretationEntry.tags,
               interpretation: {
                  id: index.toString(),
                  src: srcCID,
                  metadata: metadataCID,
               },
            }
         }

         await api.createTemplate(entry.name, templateMetadataCID, entry.max, interpretations)

         console.log(
            `Added template '${entry.name}' with metadata: '${templateMetadataCID}' and interpretations:`
         )
         console.log(await api.templateInterpretations(index))
      }

      console.log('[Initializing templates] SUCCEED')
   } catch (error) {
      console.error('[Initializing templates] FAILED')
      console.error('[Initializing templates] Error: ' + error)
   }
}

const seedGames = async (api: IAsylumApi): Promise<void> => {
   try {
      console.log('Initializing games...')

      for (const [index] of toEntries(gamesMockData)) {
         const entry = gamesMockData[index]

         await api.createGame(index, api.caller?.address || '', 0)
         const gameCID = await api.uploadMetadata(entry)
         await api.setGameMetadata(index, gameCID, entry.title, entry.genre)

         console.log(`Added game '${entry.title}' with metadata:`)
         console.log(await api.gameMetadataOf(index))

         for (const [index] of toEntries(entry.supportedTemplates)) {
            await api.addTemplateSupport(entry.id, entry.supportedTemplates[index])

            console.log(
               `Added template association: game '${entry.title}' <> templateId:'${entry.supportedTemplates[index]}'`
            )
         }

         console.log(`Game '${entry.title}':`)
         console.log(await api.game(index))
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
