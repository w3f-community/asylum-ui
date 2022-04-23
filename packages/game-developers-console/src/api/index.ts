import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { filter, find, map, merge } from 'lodash/fp'
import { getAllFiles } from 'utils'
import { AsylumApi as api } from '@asylum-ui/connection-library'
import { GameWithMetadata } from 'store/app-store'

export const fetchGamesByAccount =
   (account: InjectedAccountWithMeta) => async (): Promise<GameWithMetadata[]> => {
      const games = await api.games()

      const allowedGames = filter({ owner: account.address }, games)
      const allowedGameIds = map('id', allowedGames)
      const gamesMetadataCid = map(
         'data',
         await Promise.all(map(api.gameMetadataOf.bind(api), allowedGameIds))
      )
      const gamesMetadata = await getAllFiles(gamesMetadataCid)

      return map((game) => merge(game, find({ id: game.id }, gamesMetadata)), allowedGames)
   }

export const fetchPlayersCount = () => async (): Promise<number> => {
   const tickets = await api.tickets()
   return tickets?.length || 0
}
