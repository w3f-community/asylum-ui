import * as React from 'react'

interface IProps {
   onChange: (value: string) => void
   value?: string
}

export const SearchInput: React.FC<IProps> = ({ onChange, value = '' }) => {
   const [inputValue, setInputValue] = React.useState(value)

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const filteredValue = event.target.value
      setInputValue(filteredValue)
      onChange(filteredValue)
   }

   return (
      <div className="flex items-center">
         <input
            className="bg-white rounded-2xl w-full px-7 py-5"
            type="text"
            placeholder="Search by template id, name or owner"
            value={inputValue}
            onChange={(e) => handleChange(e)}
         />
      </div>
   )
}
