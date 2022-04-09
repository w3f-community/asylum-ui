import * as React from 'react'
import { GameCard } from '../game-card'
import { GameObject, IComponentProps } from 'types'
import classNames from 'classnames'

interface IProps extends IComponentProps {
   games: GameObject[]
}

export const GameTable: React.FC<IProps> = ({ games, className }) => {
   return (
      <div
         className={classNames([
            'no-scrollbar flex flex-wrap justify-center overflow-auto gap-9',
            className,
         ])}
      >
         {games &&
            games.map((item: GameObject) => {
               return (
                  <GameCard
                     key={item.title}
                     id={item.id}
                     onclick={console.log}
                     title={item.title}
                     img={item.img}
                  />
               )
            })}
      </div>
   )
}
