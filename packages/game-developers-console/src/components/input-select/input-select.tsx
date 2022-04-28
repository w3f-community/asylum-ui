import * as React from 'react'
import { CSSProperties } from 'react'
import Select, {
   ActionMeta,
   ClearIndicatorProps,
   DropdownIndicatorProps,
   MultiValue,
   PropsValue,
} from 'react-select'
import { ReactComponent as CloseIcon } from 'assets/svg/close.svg'
import { ReactComponent as ArrowDownIcon } from 'assets/svg/arrow-down.svg'
import { IComponentProps } from 'types'

const ClearIndicator = (props: ClearIndicatorProps<{ value: string; label: string }, true>) => {
   const {
      getStyles,
      innerProps: { ref, ...restInnerProps },
   } = props
   return (
      <div
         {...restInnerProps}
         ref={ref}
         style={getStyles('clearIndicator', props) as CSSProperties}
      >
         <CloseIcon className="mr-1 hover:fill-asylum-magenta transition-all" />
      </div>
   )
}

const DropdownIndicator = (
   props: DropdownIndicatorProps<{ value: string; label: string }, true>
) => {
   const {
      getStyles,
      innerProps: { ref, ...restInnerProps },
   } = props
   return (
      <div
         {...restInnerProps}
         ref={ref}
         style={getStyles('clearIndicator', props) as CSSProperties}
      >
         <ArrowDownIcon className="mr-1 hover:fill-asylum-magenta transition-all" />
      </div>
   )
}

interface IProps extends IComponentProps {
   name: string
   options: { value: string; label: string }[]
   defaultValue?: PropsValue<{ value: string; label: string }>
   value?: PropsValue<{ value: string; label: string }>
   onChange: (
      newValue: MultiValue<{ value: string; label: string }>,
      actionMeta: ActionMeta<{ value: string; label: string }>
   ) => void
   placeholder?: string
   className?: string
}

export const InputSelect: React.FC<IProps> = ({
   name,
   options,
   defaultValue,
   value,
   onChange,
   placeholder,
   className,
}) => {
   return (
      <Select
         className={className}
         styles={{
            control: (base, state) => ({
               ...base,
               cursor: 'text',
               fontSize: '0.875rem',
               lineHeight: '1.25rem',
               borderRadius: '1rem',
               boxShadow: 'none',
               border: 'none',
               outline: '2px solid transparent',
               outlineColor: state.isFocused ? '#8D7AEC' : 'transparent',
               paddingTop: '4px',
               paddingBottom: '4px',
               ':hover': {
                  borderColor: 'currentColor',
               },
            }),
            valueContainer: (base) => ({
               ...base,
               paddingLeft: '1rem',
            }),
            multiValue: (base) => ({
               ...base,
               backgroundColor: '#50BFFF',
               borderRadius: '0.5rem',
            }),
            multiValueLabel: (base) => ({
               ...base,
               fontSize: '0,875rem',
               color: 'white',
               paddingLeft: '0.5rem',
            }),
            multiValueRemove: (base) => ({
               ...base,
               ':hover': {
                  ...base[':hover'],
                  borderTopRightRadius: '0.5rem',
                  borderBottomRightRadius: '0.5rem',
               },
            }),
            menu: (base) => ({
               ...base,
               fontSize: '0.875rem',
               lineHeight: '1.25rem',
               color: '#303030',
            }),
            dropdownIndicator: (base) => ({
               ...base,
               cursor: 'pointer',
            }),
            clearIndicator: (base) => ({
               ...base,
               cursor: 'pointer',
            }),
            option: (base) => ({
               ...base,
               cursor: 'pointer',
            }),
            indicatorSeparator: (base) => ({
               ...base,
               backgroundColor: '#979797',
            }),
            input: (base) => ({
               ...base,
               color: '#303030',
            }),
            placeholder: (base) => ({
               ...base,
               color: '#9BA3AF',
            }),
         }}
         value={value}
         placeholder={placeholder}
         onChange={onChange}
         defaultValue={defaultValue}
         isMulti
         name={name}
         options={options}
         components={{
            ClearIndicator,
            DropdownIndicator,
         }}
      />
   )
}
