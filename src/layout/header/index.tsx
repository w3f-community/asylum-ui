import * as React from 'react'
import { Hr } from '../../components/hr'
import { Button } from '../../components/buttons/button'

interface IProps {}

export const Header: React.FC<IProps> = () => (
   <header>
      <div className="container mx-auto flex justify-end">
         <div className="w12">
            <div className="mb-4">
               <Button variant="dark">connect wallet</Button>
            </div>
            <Hr />
         </div>
      </div>
   </header>
)
