import * as React from 'react'
import { CSSProperties } from 'react'

import Select, {
   ActionMeta,
   ClearIndicatorProps,
   DropdownIndicatorProps,
   MultiValue,
   OptionProps,
   PropsValue,
} from 'react-select'

import { ReactComponent as ArrowDownIcon } from 'assets/svg/arrow-down.svg'
import { ReactComponent as CloseIcon } from 'assets/svg/close.svg'
import { Paragraph } from 'components/text/paragraph'
import { IComponentProps } from 'types'

const ClearIndicator = <OptionType extends any>(props: ClearIndicatorProps<OptionType, true>) => {
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

const DropdownIndicator = <OptionType extends any>(
   props: DropdownIndicatorProps<OptionType, true>
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

interface IProps<OptionType> extends IComponentProps {
   name: string
   options: OptionType[]
   defaultValue?: PropsValue<OptionType>
   value?: PropsValue<OptionType>
   onChange: (newValue: MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => void
   placeholder?: string
   className?: string
   errorMessage?: string
   getOptionLabel: (option: OptionType) => string
   getOptionValue: (option: OptionType) => string
   Option?: React.ComponentType<OptionProps<OptionType, true>>
}

export const InputSelect = <OptionType extends any>({
   name,
   options,
   defaultValue,
   value,
   onChange,
   placeholder,
   getOptionLabel,
   getOptionValue,
   className,
   errorMessage,
   Option,
}: IProps<OptionType>) => {
   const outlineColor = (state: any) =>
      errorMessage ? '#F87171' : state.isFocused ? '#8D7AEC' : 'transparent'
   return (
      <div>
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
                  outlineColor: outlineColor(state),
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
                  color: 'white',
                  ':hover': {
                     ...base[':hover'],
                     borderTopRightRadius: '0.5rem',
                     borderBottomRightRadius: '0.5rem',
                  },
               }),
               menu: (base) => ({
                  ...base,
                  overflow: 'hidden',
                  zIndex: 20,
                  borderRadius: '1rem',
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
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
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
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            components={{
               ClearIndicator,
               DropdownIndicator,
               ...(!Option ? {} : { Option }),
            }}
         />
         {errorMessage && <Paragraph className="text-red-400 ml-2 mt-2">{errorMessage}</Paragraph>}
      </div>
   )
}
