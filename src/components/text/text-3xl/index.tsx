import * as React from 'react'

interface IProps {
   children: React.ReactNode
}

export const Text3xl: React.FC<IProps> = ({ children = 'No text' }) => {
   return (
      <p className="font-oxanium font-medium text-3xl self-start text-white">
         {children}
      </p>
   )
}
