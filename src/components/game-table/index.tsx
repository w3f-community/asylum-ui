import * as React from 'react'
import { GameCard } from '../game-card'
import { tempObject, games } from './mock'

interface IProps {}

export const GameTable: React.FC<IProps> = () => {
   return (
      <div
         // eslint-disable-next-line max-len
         className="no-scrollbar flex flex-wrap justify-center pt-9 max-w-[80vw] overflow-auto gap-9"
      >
         {games &&
            games.map((item: tempObject) => {
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
