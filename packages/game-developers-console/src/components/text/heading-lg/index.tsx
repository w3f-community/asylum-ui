import * as React from 'react'
import { IComponentProps } from 'types'
import classNames from 'classnames'

interface IProps extends IComponentProps {
   children: React.ReactText
}

export const HeadingLg: React.FC<IProps> = ({ className, children }) => {
   return <h2 className={classNames(['font-normal text-xl', className])}>{children}</h2>
}
