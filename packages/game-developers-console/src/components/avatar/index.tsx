import * as React from 'react'

import classNames from 'classnames'

import { IComponentProps } from 'types'

interface IProps extends IComponentProps {
   size?: 'lg' | 'sm'
   empty?: boolean
   imgSrc?: string
}

export const Avatar: React.FC<IProps> = ({ imgSrc, empty, size = 'sm', className }) => {
   return (
      <div
         style={{
            backgroundImage: imgSrc ? `url('${imgSrc}')` : '',
         }}
         className={classNames(
            'bg-cover bg-center',
            {
               'rounded-2xl w-44 h-44': size === 'lg',
               'w-8 h-8 rounded-full': size === 'sm',
               'bg-gray-500': empty,
               'bg-empty ': !empty && !imgSrc, // bg-empty is default avatar,
            },
            className
         )}
      />
   )
}
