import * as React from 'react'
import { GameTable } from 'components/game-table'
import { Hr } from 'components/hr'
import { HeadingXl } from 'components/text/heading-xl'
import { games } from 'context/mocks'

export const GameList = () => {
   return (
      <div className="container mx-auto">
         <HeadingXl className="text-white">Select a game</HeadingXl>
         <Hr />
         <div className="py-6">
            <GameTable games={games} />
         </div>
      </div>
   )
}
