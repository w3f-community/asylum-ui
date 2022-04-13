import classNames from 'classnames'
import * as React from 'react'
import { IComponentProps } from 'types'

interface IProps extends IComponentProps {
   children: React.ReactNode;
}

export const Card: React.FC<IProps> = ({ className, children }) => {
   return (
      // <div className="bg-white rounded-2xl p-9 w-full">
      <div className={classNames(['bg-white rounded-2xl p-9 w-full', className])}>
         {children}
      </div>
   )
}
