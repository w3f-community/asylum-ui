import * as React from 'react'

interface IProps {
   children: React.ReactNode
}

export const Text2xl: React.FC<IProps> = ({ children = 'No text' }) => {
   return (
      <p className="font-oxanium font-medium text-2xl self-start text-asylum-gray-2">
         {children}
      </p>
   )
}
