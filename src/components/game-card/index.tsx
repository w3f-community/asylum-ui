import * as React from 'react'

interface IProps {
   title: string
   img: string
   id: string
   onclick: (id: string) => void
}

export const GameCard: React.FC<IProps> = ({ title, img, onclick, id }) => {
   return (
      <div
         className="flex flex-col bg-white cursor-pointer py-6 px-3.5 rounded-2xl"
         onClick={() => onclick(id)}
      >
         {/* // Todo refactor this text to textComponent */}
         <p className="text-center">{title}</p>
         <img className="w-64 h-64" src={img} alt={title} />
      </div>
   )
}
