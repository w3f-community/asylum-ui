import React, { useEffect } from 'react'

import { observer } from 'mobx-react-lite'
import { useQuery, useQueryClient } from 'react-query'

import { Page } from '../../layout/page'
import { fetchGamesByAccount } from 'api'
import { ReactComponent as RefreshIcon } from 'assets/svg/refresh.svg'
import { Button } from 'components/button'
import { Paragraph } from 'components/text/paragraph'
import { useStore } from 'store'

import { GameTable } from './game-table'

const RefreshButton: React.FC<{
   onClick: () => void
}> = ({ onClick }) => (
   <Button variant="light" className="pl-4 w-32" onClick={onClick}>
      <RefreshIcon className="fill-text-base w-4 h-4 inline-block mr-2" />
      Refresh
   </Button>
)

export const GameSelection = observer(() => {
   const store = useStore()
   const queryClient = useQueryClient()
   const { data: games, refetch } = useQuery(['games', store.account?.address], () =>
      store.account ? fetchGamesByAccount(store.account) : null
   )

   useEffect(() => {
      queryClient.invalidateQueries('games')
   }, [store.account])

   return (
      <Page title={'Select a game'} headerButton={<RefreshButton onClick={refetch} />}>
         {games?.length ? (
            <GameTable games={games} />
         ) : (
            <Paragraph className="text-white">
               No games found associated with your account.
            </Paragraph>
         )}
      </Page>
   )
})
