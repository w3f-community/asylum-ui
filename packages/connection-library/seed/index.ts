import { AsylumApi } from '../src'
import { Keyring } from '@polkadot/api'
import { IAsylumApi } from '../dist'

const seed = async (api: IAsylumApi): Promise<void> => {
   try {
      await api.createGame(1, api.caller?.address || '', 2400)
   } catch (error) {
      console.error('Error: ' + error)
   }
}

AsylumApi.load('ws://127.0.0.1:9944')
   .then((api) => {
      const seeder = new Keyring({ type: 'sr25519' }).addFromUri('//Alice')

      seed(api.withCaller(seeder)).then(() => terminate(0))
   })
   .catch((err) => {
      console.error(err)
      terminate(1)
   })

const terminate = (exitCode: number): void => {
   process.exit(exitCode)
}

export {}
