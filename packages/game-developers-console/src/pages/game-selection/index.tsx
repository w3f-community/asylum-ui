import * as React from 'react'
import { useEffect } from 'react'
import { GameTable } from 'components/game-table'
import { Hr } from 'components/hr'
import { HeadingXl } from 'components/text/heading-xl'
import { observer } from 'mobx-react-lite'
import { useStore } from 'store'
import { Paragraph } from 'components/text/paragraph'
import { fetchGamesByAccount } from 'api'
import { ReactComponent as RefreshIcon } from 'assets/svg/refresh.svg'
import { Button } from 'components/button'

export const GameList = observer(() => {
   const store = useStore()
   const [games, setGames] = React.useState<any[]>([])

   useEffect(() => {
      if (store.account) {
         fetchGamesByAccount(store.account).then(setGames)
      }
   }, [store.account])

   return (
      <div className="container mx-auto">
         <div className="flex justify-between items-center">
            <HeadingXl className="text-white">Select a game</HeadingXl>
            {store.account && (
               <Button
                  variant="light"
                  className="pl-4 w-32"
                  onClick={() => store.account && fetchGamesByAccount(store.account).then(setGames)}
               >
                  <RefreshIcon className="fill-text-base w-4 h-4 inline-block mr-2" />
                  Refresh
               </Button>
            )}
         </div>
         <Hr />
         <div className="py-6">
            {store.account ? (
               games.length ? (
                  <GameTable games={games} />
               ) : (
                  <Paragraph className="text-white">
                     No games found associated with your account.
                  </Paragraph>
               )
            ) : (
               <Paragraph className="text-white">
                  Please, connect wallet to see associated games.
               </Paragraph>
            )}
         </div>
      </div>
   )
})
