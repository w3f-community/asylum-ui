import * as React from 'react'
import { GameCard } from '../game-card'
import { GameObject } from '../../types'

interface IProps {
   games: GameObject[]
}

export const GameTable: React.FC<IProps> = ({ games }) => {
   return (
      <div className="no-scrollbar flex flex-wrap justify-center overflow-auto gap-9">
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
