import * as React from 'react'

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
         {/* // Todo refactor this text to textComponent */}
         <p className="font-ubuntu text-center">{title}</p>
         <img className="w-64 h-64" src={img} alt={title} />
      </div>
   )
}
