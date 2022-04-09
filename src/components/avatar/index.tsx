import * as React from 'react'
import { IComponentProps } from 'types'
import classNames from 'classnames'

interface IProps extends IComponentProps {}

export const Avatar: React.FC<IProps> = ({ className }) => {
   return <div className={classNames('bg-empty bg-contain w-9 h-9 rounded-full', className)} />
}
