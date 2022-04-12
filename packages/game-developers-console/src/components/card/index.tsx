import * as React from 'react'

interface IProps {
   children: React.ReactNode;
}

export const Card: React.FC<IProps> = ({ children }) => {
   return (
      <div className="bg-white rounded-2xl p-9 w-full">
         {children}
      </div>
   )
}
