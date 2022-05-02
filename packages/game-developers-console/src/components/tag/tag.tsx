import * as React from 'react'

import classNames from 'classnames'

import { IComponentProps } from 'types'

interface IProps extends IComponentProps {
   children: React.ReactText
}

export const Tag: React.FC<IProps> = ({ className, children }) => (
   <span className={classNames('bg-asylum-blue rounded-lg text-white py-1 px-2', className)}>
      {children}
   </span>
)
