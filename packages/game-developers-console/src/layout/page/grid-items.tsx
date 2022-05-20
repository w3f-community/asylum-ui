import React from 'react'

interface IGridItems {
   className?: string
   children: React.ReactNode
}

export const GridItems = ({ className, children }: IGridItems) => {
   return (
      <div className={`grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-9 ${className}`}>
         {children}
      </div>
   )
}
