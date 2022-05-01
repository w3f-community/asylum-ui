import * as React from 'react'

import classNames from 'classnames'
import { Heading } from 'components/text/heading'

import { IComponentProps } from 'types'

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
            'group flex flex-col bg-white cursor-pointer basis-1/3 rounded-2xl transition-all duration-400 overflow-hidden',
            { 'gradient-active-effect': active, 'gradient-hover-effect': !active },
            className,
         ])}
         onClick={() => onClick(id)}
      >
         <Heading
            className={classNames('text-center py-2 group-hover:text-white', {
               'text-white': active,
            })}
         >
            {title}
         </Heading>
         <div
            style={{ backgroundImage: img ? `url('${img}')` : '' }}
            className="w-full aspect-square bg-cover bg-center"
         />
      </div>
   )
}
