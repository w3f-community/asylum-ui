import classNames from 'classnames'
import * as React from 'react'

interface IProps {
   children: React.ReactNode
   color?: 'while' | 'black'
}

export const HeadingXl: React.FC<IProps> = ({ children = 'No text', color = 'black' }) => {
   return <h1 className={classNames('font-medium text-2xl self-start', {
      'text-white': color === 'while',
      'text-black': color === 'black',
   })}>{children}</h1>
}
