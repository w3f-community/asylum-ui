import * as React from 'react'

import { IComponentProps } from 'types'
import classNames from 'classnames'

interface IProps extends IComponentProps {
   title: string
   img: string
   id: string
   onclick: (id: string) => void
}

export const GameCard: React.FC<IProps> = ({ title, img, onclick, id, className }) => {
   return (
      <div
         className={classNames([
            'flex flex-col bg-white cursor-pointer py-6 px-3.5 rounded-2xl',
            className,
         ])}
         onClick={() => onclick(id)}
      >
         {/* // Todo refactor this text to textComponent */}
         <p className="text-center">{title}</p>
         <img className="w-64 h-64" src={img} alt={title} />
      </div>
   )
}
