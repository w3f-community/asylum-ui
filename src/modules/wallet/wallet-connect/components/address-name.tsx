import { Button } from 'components/button'
import { Avatar } from 'components/avatar'
import * as React from 'react'

interface IProps {
   name?: string
}

export const AddressName: React.FC<IProps> = ({ name }) => {
   return (
      <Button variant="light" size="lg" className="grow flex gap-4 items-center bg-white" disabled>
         <Avatar />
         {name}
      </Button>
   )
}
