import * as React from 'react'

import classNames from 'classnames'

import { IComponentProps } from 'types'

interface IProps extends IComponentProps {
   htmlFor?: string
   children: React.ReactNode
}

export const InputLabel: React.FC<IProps> = ({ htmlFor, className, children }) => (
   <label
      htmlFor={htmlFor}
      className={classNames('font-secondary block text-lg mb-1 pl-4', className)}
   >
      {children}
   </label>
)
