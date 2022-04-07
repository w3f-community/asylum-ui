import * as React from 'react'

interface IProps {
   children: React.ReactNode
}

export const Heading: React.FC<IProps> = ({ children = 'No text' }) => {
   return <h3 className="font-normal text-lg self-start pb-4">{children}</h3>
}
