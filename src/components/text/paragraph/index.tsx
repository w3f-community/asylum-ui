import * as React from 'react'

interface IProps {
   children: React.ReactNode
}

export const Paragraph: React.FC<IProps> = ({ children }) => {
   return <p className="font-normal text-base self-start">{children}</p>
}
