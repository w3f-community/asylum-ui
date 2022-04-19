import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { filter, flow, map } from 'lodash/fp'
import { getAllFiles } from 'utils'
import { AsylumApi as api } from '@asylum-ui/connection-library'

export const fetchGamesByAccount = async (account: InjectedAccountWithMeta) => {
   const games = await api.games()

   const allowedGameIds = flow(filter({ owner: account.address }), map('id'))(games)
   const gamesMetadataCid = await api.gamesMetadata()
   const gamesMetadata = await getAllFiles(gamesMetadataCid)

   return filter((game) => allowedGameIds.includes(game.id), gamesMetadata)
}
