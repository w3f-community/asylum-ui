import React from 'react'

import classNames from 'classnames'

import { IComponentProps } from 'types'

interface IProps extends IComponentProps {
   error?: boolean
   disabled?: boolean
   variant?: 'dark' | 'light' | 'success'
   size?: 'sm' | 'md' | 'lg'
   active?: boolean
   onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
   children: React.ReactNode
}

export const Button: React.FC<IProps> = ({
   variant = 'light',
   size = 'md',
   className,
   error,
   disabled,
   active,
   onClick,
   children,
}) => (
   <button
      onClick={onClick}
      className={classNames(
         'group rounded-xl px-5 py-2 pt-2.5 text-base text-center font-secondary transition-all',
         {
            'bg-gray-800 text-white': variant === 'dark' && !disabled,
            'bg-white text-gray-700': variant === 'light',
            'bg-green-600 text-white': variant === 'success',
            'text-base': size === 'sm',
            'h-12 rounded-2xl': size === 'lg',
            'border-2 border-red-500': error,
            'gradient-hover-effect': variant !== 'success' && !disabled && !active,
            'gradient-active-effect': active,
            'cursor-default pointer-events-none': disabled,
            'bg-gray-500 text-white': disabled && !className?.split(' ').includes('bg-white'),
            disabled,
         },
         [className]
      )}
   >
      {children}
   </button>
)
