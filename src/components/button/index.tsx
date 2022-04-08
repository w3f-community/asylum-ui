import * as React from 'react'
import classNames from 'classnames'

import { IComponentProps } from 'types'

interface IProps extends IComponentProps {
   error?: boolean
   disabled?: boolean
   variant?: 'dark' | 'light' | 'success'
   size?: 'sm' | 'md' | 'lg'
   onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: React.FC<IProps> = ({
   variant = 'light',
   size = 'md',
   className,
   error,
   disabled,
   onClick,
   children,
}) => (
   <button
      onClick={onClick}
      className={classNames(
         'group rounded-xl px-6 py-2 text-base text-center',
         {
            'bg-gray-800 text-white': variant === 'dark',
            'bg-white text-gray-700': variant === 'light',
            'bg-green-600 text-white': variant === 'success',
            'text-base': size === 'sm',
            'h-14 rounded-2xl': size === 'lg',
            'border-2 border-red-500': error,
            'gradient-hover-effect': variant !== 'success' && !disabled,
            'cursor-auto': disabled,
            disabled,
         },
         [className]
      )}
   >
      {children}
   </button>
)
