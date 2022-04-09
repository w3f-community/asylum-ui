import * as React from 'react'
import { IComponentProps } from 'types'
import classNames from 'classnames'

interface IProps extends IComponentProps {
   children: React.ReactText
}

export const HeadingLg: React.FC<IProps> = ({ className, children }) => {
   return <h2 className={classNames(['font-medium text-xl self-start', className])}>{children}</h2>
}
