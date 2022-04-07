import * as React from 'react'

interface IProps {
   children: React.ReactNode
}

export const HeadingXl: React.FC<IProps> = ({ children = 'No text' }) => {
   return <h1 className="font-medium text-2xl self-start text-white">{children}</h1>
}
