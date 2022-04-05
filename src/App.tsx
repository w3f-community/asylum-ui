import * as React from 'react'
import { GameList } from './pages/game-selection'

export const App = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-asylum-gray-1">
      <GameList/>
    </div>
  )
}
