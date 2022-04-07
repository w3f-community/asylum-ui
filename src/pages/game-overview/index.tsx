import * as React from 'react'
import { Hr } from '../../components/hr'
import { Text3xl } from '../../components/text/text-3xl'
import { GameDescription } from './game-description'

interface IProps {
}

export const GameOverview: React.FC<IProps> = () => {
   return (
      <div className="container mx-auto">
         <div className="min-h-screen flex justify-center items-center ">
            <div className="bg-page page-flex">
               <Text3xl>Game overview</Text3xl>
               <Hr />
               <GameDescription />
            </div>
         </div>
      </div>
   )
}
