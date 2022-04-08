import * as React from 'react'
import classNames from 'classnames'
import { IComponentProps } from 'types'

interface IProps extends IComponentProps {
   active?: boolean
}

export const Hr: React.FC<IProps> = ({ active = false, className }) => {
   return (
      <hr
         className={classNames(
            'border-0 bg-gradient-hr my-4 h-px w-full',
            {
               'bg-gradient-hr-active': active,
            },
            [className]
         )}
      />
   )
}
