import * as React from 'react'
import { Hr } from '../../components/hr'
import { Text3xl } from '../../components/text/text-3xl'
import { GameDescription } from './game-description'

interface IProps {
}

export const GameOverview: React.FC<IProps> = () => {
   return (
      <div className="bg-page page-width page-flex">
         <Text3xl>Game overview</Text3xl>
         <Hr />
         <GameDescription />
      </div >
   )
}
