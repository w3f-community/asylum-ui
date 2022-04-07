import * as React from 'react'
// import { BorderButton } from '../buttons/border-button'

interface IProps {
  title: string;
  img: string;
  id: string;
  onclick: (id: string) => void
}

export const GameCard: React.FC<IProps> = ({ title, img, onclick, id }) => {
   return (
      <div className="game-card"
         onClick={() => onclick(id)}
      >
         <p className="font-ubuntu text-center">{title}</p>
         <div className="empty-img w-64 h-64"></div>
         {/* <BorderButton text={'SELECT'} onClick={() => console.log(title)} /> */}
      </div>
   )
}
