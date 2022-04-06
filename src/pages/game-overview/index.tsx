import * as React from 'react'
import { Hr } from '../../components/hr'
import { GameDescription } from './game-description'

export const GameOverview: React.FC = () => {
   return (
      <div className="bg-page page-width page-flex">
         <p className="text-header-of-page text-white text-oxanium ">
            Game overview
         </p>
         <Hr />
         <GameDescription />
      </div >
   )
}
