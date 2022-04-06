import * as React from 'react'
import { GameTable } from '../../components/game-table'
import { Hr } from '../../components/hr'

export const GameList = () => {
   return (
      <div className="px-14 py-7 rounded-xl">
         <p className="text-oxanium text-center text-white text-header-of-page">Select a game</p>
         <Hr />
         <GameTable />
      </div>
   )
}
