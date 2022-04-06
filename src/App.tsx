import * as React from 'react'
import { GameOverview } from './pages/game-overview'
import { GameList } from './pages/game-selection'

export const App = () => {
   return (
      // eslint-disable-next-line max-len
      <div className="h-screen flex justify-center items-center bg-asylum-gray-1">
         {/* <GameList/> */}
         <GameOverview />
      </div>
   )
}
