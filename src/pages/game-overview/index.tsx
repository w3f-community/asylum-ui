import * as React from 'react'
import { Details } from './details'
import { Hr } from 'components/hr'
import { HeadingXl } from 'components/text/heading-xl'
import { GameDescription } from './game-description'
import { IComponentProps } from 'types'
import { Rewies } from 'components/rewies'

interface IProps extends IComponentProps { }

export const GameOverview: React.FC<IProps> = () => {
   return (
      <div className="container mx-auto">
         <div className="min-h-screen flex flex-col justify-center items-center">
            <HeadingXl className="text-white">Game overview</HeadingXl>
            <Hr />
            <div className="flex flex-col gap-8 py-6">
               <GameDescription />
               <Details />
               <HeadingXl className="text-white mt-16">Rewies</HeadingXl>
               <Rewies />
               <Rewies />
            </div>
         </div>
      </div>
   )
}
