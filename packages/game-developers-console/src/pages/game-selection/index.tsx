import * as React from 'react'
import { useEffect } from 'react'
import noop from 'lodash/noop'
import { GameTable } from 'components/game-table'
import { Hr } from 'components/hr'
import { HeadingXl } from 'components/text/heading-xl'
import { observer } from 'mobx-react-lite'
import { useStore } from 'store'
import { Paragraph } from 'components/text/paragraph'
import { fetchGamesByAccount } from 'api'
import { ReactComponent as RefreshIcon } from 'assets/svg/refresh.svg'
import { Button } from 'components/button'
import { useAsylumApi } from 'hooks'

interface IRefreshButtonProps {
   onClick: () => void
}

const RefreshButton: React.FC<IRefreshButtonProps> = ({ onClick }) => (
   <Button variant="light" className="pl-4 w-32" onClick={onClick}>
      <RefreshIcon className="fill-text-base w-4 h-4 inline-block mr-2" />
      Refresh
   </Button>
)

export const GameList = observer(() => {
   const store = useStore()
   const { data: games, refetch } = store.account
      ? useAsylumApi(fetchGamesByAccount(store.account))
      : { data: [], refetch: noop }

   useEffect(() => {
      refetch()
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
