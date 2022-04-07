import * as React from 'react'

interface IProps {
   children: React.ReactNode
}

export const HeadingLg: React.FC<IProps> = ({ children = 'No text' }) => {
   return <h2 className="font-medium text-xl self-start">{children}</h2>
}
