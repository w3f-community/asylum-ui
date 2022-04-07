import * as React from 'react'

interface IProps {
   children: React.ReactNode;
}

export const TextSm: React.FC<IProps> = ({ children }) => {
   return (
      <p className="font-ubuntu font-normal text-sm self-start text-asylum-gray-1">
         {children}
      </p>
   )
}
