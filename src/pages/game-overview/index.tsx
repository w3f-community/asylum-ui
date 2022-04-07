import * as React from 'react'
import { Hr } from '../../components/hr'
import { GameDescription } from '../../modules/game-description'

export const GameOverview: React.FC = () => {
   return (
      <div className="container mx-auto">
         <div className="min-h-screen flex justify-center items-center ">
            <div className="bg-page page-flex">
               <p className="text-header-of-page text-white text-oxanium ">Game overview</p>
               <Hr />
               <GameDescription />
            </div>
         </div>
      </div>
   )
}
