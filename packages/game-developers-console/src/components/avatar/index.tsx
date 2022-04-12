import * as React from 'react'
import { IComponentProps } from 'types'
import classNames from 'classnames'

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
            'bg-cover bg-center w-9 h-9 rounded-full',
            {
               'rounded-2xl w-32 h-32': size === 'lg',
               'bg-gray-500': empty,
               'bg-empty ': !empty && !imgSrc, // bg-empty is default avatar,
            },
            className
         )}
      />
   )
}
