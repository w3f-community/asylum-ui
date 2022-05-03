import * as React from 'react'
import { ChangeEventHandler } from 'react'

import classNames from 'classnames'
import { InputLabel } from 'components/input-label'
import { Paragraph } from 'components/text/paragraph'

import { IComponentProps } from 'types'

interface IProps extends IComponentProps {
   type?: 'text' | 'textarea'
   name: string
   label?: string
   value: string | undefined
   onChange?: ChangeEventHandler<any>
   onKeyPress?: React.KeyboardEventHandler<any>
   placeholder?: string
   errorMessage?: string
   endAdornment?: React.ReactNode
   disabled?: boolean
   rows?: number
}

export const InputField: React.FC<IProps> = ({
   type = 'text',
   rows,
   name,
   label,
   value,
   placeholder,
   endAdornment,
   onChange,
   errorMessage,
   onKeyPress,
   disabled,
   className,
}) => {
   const InputComponent = type === 'text' ? 'input' : 'textarea'
   return (
      <>
         <div className={classNames('w-full relative', className)}>
            {label && <InputLabel>{label}</InputLabel>}
            <InputComponent
               className={classNames(
                  'peer text-base font-primary rounded-2xl w-full px-4 py-3 outline-none outline-2 outline-offset-0 transition-all',
                  {
                     'pr-12': endAdornment,
                     'bg-white text-gray-700': !disabled,
                     'cursor-default pointer-events-none bg-gray-500 text-white': disabled,
                  },
                  errorMessage
                     ? 'outline-red-400'
                     : 'outline-transparent focus:outline-asylum-magenta'
               )}
               rows={rows}
               type={type}
               name={name}
               placeholder={placeholder}
               value={value}
               onChange={onChange}
               onKeyPress={onKeyPress}
               {...(disabled && { tabIndex: -1 })}
            />
            <div className="absolute right-5 top-1/2 -translate-y-1/2 opacity-50 focus:opacity-100 peer-focus:opacity-100 hover:opacity-100 peer-hover:opacity-100 transition-all">
               {endAdornment}
            </div>
            {errorMessage && (
               <Paragraph className="text-red-400 ml-2 mt-2">{errorMessage}</Paragraph>
            )}
         </div>
      </>
   )
}
