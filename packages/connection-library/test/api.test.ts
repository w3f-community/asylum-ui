import { AsylumApi, IAsylumApi } from '../src'
import { Keyring } from '@polkadot/api'

let api: IAsylumApi

describe('API getters test', () => {
   beforeAll(async () => {
      api = await AsylumApi.connect(process.env.ENDPOINT_URL || '')
      const seeder = new Keyring({ type: 'sr25519' }).addFromUri(process.env.SEEDER_MNEMONIC || '')
      return api.withKeyringPair(seeder)
   })

   it('should return items interpretations', async () => {
      const interpretations = await api.itemInterpretations('0', '0')
      expect(interpretations).toHaveLength(2)
      expect(interpretations).toEqual(
         expect.arrayContaining([
            expect.objectContaining({ interpretation: expect.objectContaining({ id: '355' }) }),
            expect.objectContaining({ interpretation: expect.objectContaining({ id: '0' }) }),
         ])
      )
   })
})

export {}
