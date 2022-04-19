import * as React from 'react'
import { GameCard } from '../game-card'
import { IComponentProps } from 'types'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import { useStore } from 'store'
import { GameObject } from '@asylum-ui/connection-library'

interface IProps extends IComponentProps {
   games: GameObject[]
}

export const GameTable: React.FC<IProps> = observer(({ games, className }) => {
   const store = useStore()
   const handleSelectGame = (game: GameObject) => {
      store.setSelectedGame(game)
   }

   return (
      <div
         className={classNames([
            'no-scrollbar overflow-auto grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-9',
            className,
         ])}
      >
         {games &&
            games.map((item: GameObject) => {
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
      </div>
   )
})
