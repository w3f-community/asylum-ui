import * as React from 'react'
import classNames from 'classnames'
import { IComponentProps } from 'types'

interface IProps extends IComponentProps {
   children: React.ReactText
}

export const HeadingXl: React.FC<IProps> = ({ className, children }) => {
   return <h1 className={classNames(['font-medium text-2xl self-start', className])}>{children}</h1>
}
