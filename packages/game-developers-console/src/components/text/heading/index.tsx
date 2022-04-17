import * as React from 'react'
import classNames from 'classnames'
import { IComponentProps } from 'types'

interface IProps extends IComponentProps {
   children: React.ReactNode
}

export const Heading: React.FC<IProps> = ({ className, children }) => {
   return <h3 className={classNames(['font-normal text-lg', className])}>{children}</h3>
}
