import * as React from 'react'
// import { BorderButton } from '../buttons/border-button'

interface IProps {
  title: string;
  img: string;
}

export const GameCard: React.FC<IProps> = ({ title, img }) => {
  return (
    <div className="game-card">
      <p className="text-ubuntu text-center">{title}</p>
      <div className="empty-img w-64 h-64"></div>
      {/* <BorderButton text={'SELECT'} onClick={() => console.log(title)} /> */}
    </div>
  )
}
