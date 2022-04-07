import * as React from 'react'
import { GameCard } from '../game-card'

// @TODO Delete this object, after adding normal blockchaine
const games: tempObject[] = [
   {
      title: 'Fortnite',
      img: '',
      id: '1',
   },
   {
      title: 'GTA V',
      img: '',
      id: '2',
   },
   {
      title: 'Game a',
      img: '',
      id: '3',
   },
   {
      title: 'Minecraft',
      img: '',
      id: '4',
   },
   {
      title: 'Call of Duty',
      img: '',
      id: '5',
   },
   {
      title: 'RDR2',
      img: '',
      id: '6',
   },
   {
      title: 'Stalker',
      img: '',
      id: '7',
   },
   {
      title: 'Slime Rancher',
      img: '',
      id: '8',
   },
]

interface tempObject {
   title: string
   img: string
   id: string
}

interface IProps {}

export const GameTable: React.FC<IProps> = () => {
   return (
      <div className="no-scrollbar flex flex-wrap justify-center pt-[35px] max-h-[70vh] max-w-[80vw] overflow-auto gap-9">
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
