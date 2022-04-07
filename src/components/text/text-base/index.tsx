import * as React from 'react'

interface IProps {
   children: React.ReactNode
}

export const TextBase: React.FC<IProps> = ({ children = 'No text' }) => {
   return (
      <p className="font-oxanium font-normal text-base self-start pb-4 text-asylum-gray-2">
         {children}
      </p>
   )
}
