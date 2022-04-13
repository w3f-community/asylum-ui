import { Heading } from 'components/text/heading'
import * as React from 'react'

interface IProps {
   onChange: (value: string) => void
   value?: string
   variants?: string[]
}

interface IVariant {
   text: string
   onClick: (variant: string) => void
}

const Variant: React.FC<IVariant> = ({ text, onClick }) => {
   return (
      <div
         onClick={() => onClick(text)}
         className="w-full cursor-pointer"
      >
         <Heading
            className="w-full text-white font-sans px-7 py-3.5 gradient-hover-effect"
         >{text}</Heading>
      </div>
   )
}

export const SearchInput: React.FC<IProps> = ({ onChange, value = '', variants = [] }) => {
   const [inputValue, setInputValue] = React.useState(value)

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const filteredValue = event.target.value
      setInputValue(filteredValue)
      onChange(filteredValue)
   }

   const handleClick = (variant: string) => setInputValue(variant)

   return (
      <div className="bg-black flex flex-col items-start rounded-2xl">
         <input
            className="bg-white text-base font-light rounded-2xl w-full pl-7 pr-12 py-5 outline-none search-in-background"
            type="text"
            placeholder="Search by template id, name or owner"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
         />
         <div className="w-full rounded-b-2xl overflow-hidden">
            {inputValue.length > 2 && variants.length > 0 && (
               variants.map((variant: string) => {
                  return (<Variant key={variant} onClick={handleClick} text={variant} />)
               })
            )}
         </div>
      </div>
   )
}
