import * as React from 'react'

import classNames from 'classnames'

import { ReactComponent as CloseIcon } from 'assets/svg/close.svg'
import { ReactComponent as SearchIcon } from 'assets/svg/search.svg'
import { InputField } from 'components/input-field'
import { Heading } from 'components/text/heading'
import { IComponentProps } from 'types'

interface IProps extends IComponentProps {
   onSelect: (value: string) => void
   value?: string
   variants?: string[]
}

interface IVariantProps extends IComponentProps {
   text: string
   onClick: (variant: string) => void
   userVariant?: boolean
}

const Variant: React.FC<IVariantProps> = ({ text, userVariant, onClick, className }) => {
   return (
      <div
         tabIndex={0}
         onClick={() => {
            onClick(text)
         }}
         onKeyPress={(e) => e.key === 'Enter' && onClick(text)}
         className={classNames(
            'w-full cursor-pointer focus-visible:outline-none focus-visible:gradient-active-effect gradient-hover-effect',
            className
         )}
      >
         <Heading className="text-white font-sans px-7 py-3.5">
            {text}
            {userVariant && (
               <div className="text-gray-400 grow inline"> - search items by name</div>
            )}
         </Heading>
      </div>
   )
}

export const SearchAutocomplete: React.FC<IProps> = ({
   value = '',
   variants = [],
   onSelect,
   className,
}) => {
   const [isOpen, setIsOpen] = React.useState(false)
   const [inputValue, setInputValue] = React.useState(value)
   const [suggestions, setSuggestions] = React.useState<string[]>([])

   const filterVariants = (value: string) => {
      const filteredVariants = variants.filter((variant) =>
         variant?.toLowerCase().includes(value.toLowerCase())
      )
      setSuggestions(filteredVariants)
   }

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      filterVariants(value)
      setInputValue(value)
      setIsOpen(true)

      if (!value) {
         onSelect('')
      }
   }

   const handleSelect = (variant: string) => {
      onSelect(variant)
      filterVariants(variant)
      setInputValue(variant)
      setIsOpen(false)
   }

   return (
      <div
         className={classNames(
            'bg-black flex flex-col items-start rounded-2xl relative z-10',
            className
         )}
      >
         <InputField
            className="z-0"
            name="search"
            value={inputValue}
            onChange={handleChange}
            placeholder="Search by template id, name or owner"
            endAdornment={
               <div className="flex items-center gap-4">
                  {inputValue && (
                     <CloseIcon
                        className="cursor-pointer hover:fill-asylum-magenta transition-all"
                        onClick={() => handleSelect('')}
                     />
                  )}
                  <SearchIcon
                     className="cursor-pointer hover:fill-asylum-magenta transition-all"
                     onClick={() => handleSelect(inputValue)}
                  />
               </div>
            }
            onKeyPress={(e) => e.key === 'Enter' && handleSelect(inputValue)}
         />
         <div className="w-full rounded-b-2xl overflow-hidden bg-gray-800 absolute top-full -mt-4 -z-10">
            {inputValue && isOpen && (
               <>
                  <Variant
                     className="pt-4"
                     userVariant={true}
                     key="user-input"
                     text={inputValue}
                     onClick={handleSelect}
                  />
                  {suggestions.map((variant) => (
                     <Variant key={variant} text={variant} onClick={handleSelect} />
                  ))}
               </>
            )}
         </div>
      </div>
   )
}
