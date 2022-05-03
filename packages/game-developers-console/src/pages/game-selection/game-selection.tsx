import * as React from 'react'
import { useEffect } from 'react'

import { GameTable } from './game-table'
import { Button } from 'components/button'
import { Hr } from 'components/hr'
import { HeadingXl } from 'components/text/heading-xl'
import { Paragraph } from 'components/text/paragraph'
import { observer } from 'mobx-react-lite'
import { useQuery, useQueryClient } from 'react-query'

import { ReactComponent as RefreshIcon } from '../../assets/svg/refresh.svg'
import { fetchGamesByAccount } from 'api'
import { useStore } from 'store'

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
      <div className="container mx-auto">
         <div className="flex justify-between items-center">
            <HeadingXl className="text-white">Select a game</HeadingXl>
            <RefreshButton onClick={refetch} />
         </div>
         <Hr />
         <div className="py-6">
            {games?.length ? (
               <GameTable games={games} />
            ) : (
               <Paragraph className="text-white">
                  No games found associated with your account.
               </Paragraph>
            )}
         </div>
      </div>
   )
})
