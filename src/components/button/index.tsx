import * as React from 'react'
import classNames from 'classnames'

interface IProps {
   variant?: 'dark' | 'light'
   size?: 'sm' | 'md' | 'lg'
}

export const Button: React.FC<IProps> = ({ variant = 'light', size = 'md', children }) => (
   <button
      className={classNames('rounded-xl text-white px-8 py-1 gradient-hover-effect', {
         'bg-gray-800': variant === 'dark',
         'bg-white': variant === 'light',
         'text-base': size === 'sm',
      })}
   >
      {children}
   </button>
)
