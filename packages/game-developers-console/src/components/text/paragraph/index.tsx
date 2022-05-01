import * as React from 'react'

import classNames from 'classnames'

import { IComponentProps } from 'types'

interface IProps extends IComponentProps {
   children: React.ReactNode
}

export const Paragraph: React.FC<IProps> = ({ className, children }) => {
   return <p className={classNames(['font-normal text-base', className])}>{children}</p>
}
