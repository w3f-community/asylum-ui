import * as React from 'react'

import { IComponentProps } from 'types'
import classNames from 'classnames'

interface IProps extends IComponentProps {
   children: React.ReactNode
}

export const Paragraph: React.FC<IProps> = ({ className, children }) => {
   return <p className={classNames(['font-normal text-base self-start', className])}>{children}</p>
}
