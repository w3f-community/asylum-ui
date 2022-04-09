import * as React from 'react'

import { IComponentProps } from 'types'
import classNames from 'classnames'

interface IProps extends IComponentProps {
   title: string
   img: string
   id: string
   active?: boolean
   onClick: (id: string) => void
}

export const GameCard: React.FC<IProps> = ({
   active = false,
   title,
   img,
   onClick,
   id,
   className,
}) => {
   return (
      <div
         className={classNames([
            'flex flex-col bg-white cursor-pointer p-[2px]  rounded-2xl transition-all duration-400',
            { 'gradient-active-effect': active, 'gradient-hover-effect': !active },
            className,
         ])}
         onClick={() => onClick(id)}
      >
         {/* // Todo refactor this text to textComponent */}
         <p className="text-center mb-2 mt-2">{title}</p>
         <div
            style={{ backgroundImage: img ? `url('${img}')` : '' }}
            className="w-64 h-64 rounded-2xl bg-cover bg-center"
         />
      </div>
   )
}
