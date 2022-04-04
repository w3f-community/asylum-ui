import * as React from 'react'
import { GameList } from '../modules/game-list'

export const Core = () => {
  return (
    <div className='h-screen flex justify-center items-center bg-asylum-gray-1'>
      <GameList />
    </div>
  )
}
