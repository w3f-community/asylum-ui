import * as React from 'react'

interface IProps {
  text: string;
  onClick: () => void;
}

export const BorderButton: React.FC<IProps> = ({ text, onClick }) => {
  return (
    <button
      className='border-blacl/[.12] p-1.5 m-1.5 custom-text text-sm text-custom-pink'
      onClick={onClick}
    >
      {text}
    </button>
  )
}
