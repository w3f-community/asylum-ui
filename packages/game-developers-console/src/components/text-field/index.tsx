import * as React from 'react'
import { ChangeEventHandler } from 'react'
import { IComponentProps } from 'types'
import classNames from 'classnames'

interface IProps extends IComponentProps {
   value: string
   onChange?: ChangeEventHandler<HTMLInputElement>
   onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>
   placeholder?: string
   endAdornment?: React.ReactNode
}

export const TextField: React.FC<IProps> = ({
   value,
   placeholder,
   endAdornment,
   onChange,
   onKeyPress,
   className,
}) => {
   return (
      <div className={classNames('w-full relative', className)}>
         <input
            className="peer bg-white text-base font-light rounded-2xl w-full pl-7 pr-12 py-3 outline-none border-2 border-gray-700 focus:border-2 focus:border-asylum-magenta transition-all"
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
         />
         <div className="absolute right-5 top-1/2 -translate-y-1/2 opacity-50 peer-focus:opacity-100 peer-hover:opacity-100 transition-all">
            {endAdornment}
         </div>
      </div>
   )
}
