import * as React from 'react'

import classNames from 'classnames'

import { IComponentProps } from 'types'

interface IProps extends IComponentProps {
   children: React.ReactText
}

export const HeadingLg: React.FC<IProps> = ({ className, children }) => {
   return <h2 className={classNames(['font-normal text-xl', className])}>{children}</h2>
}
