import React from 'react'

import classNames from 'classnames'
import { observer } from 'mobx-react-lite'

import { GridItems } from '../../layout/page/grid-items'
import { useStore } from 'store'
import { GameWithMetadata } from 'store/app-store'

import { GameCard } from './game-card'

interface IGameTable {
   games: GameWithMetadata[]
}

export const GameTable = observer(({ games }: IGameTable) => {
   const store = useStore()
   const handleSelectGame = (game: GameWithMetadata) => {
      store.setSelectedGame(game)
   }

   return (
      <GridItems>
         {games &&
            games.map((item: GameWithMetadata) => {
               return (
                  <GameCard
                     className={classNames({
                        grayscale: store.selectedGame && item.id !== store.selectedGame?.id,
                     })}
                     active={item.id === store.selectedGame?.id}
                     key={item.title}
                     id={item.id}
                     onClick={() => handleSelectGame(item)}
                     title={item.title}
                     img={item.img}
                  />
               )
            })}
      </GridItems>
   )
})
