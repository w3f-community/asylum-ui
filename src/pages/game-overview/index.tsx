import * as React from 'react'
import { Details } from './details'
import { Hr } from 'components/hr'
import { HeadingXl } from 'components/text/heading-xl'
import { GameDescription } from './game-description'
import { IComponentProps } from 'types'
import { Reviews } from 'pages/game-overview/reviews'
import { reviews } from 'context/mocks'

interface IProps extends IComponentProps {}

export const GameOverview: React.FC<IProps> = () => {
   return (
      <div className="container mx-auto">
         <HeadingXl className="text-white self-start">Game overview</HeadingXl>
         <Hr />
         <div className="flex flex-col gap-9 py-6">
            <GameDescription />
            <Details />
            <div className="flex flex-col">
               <Reviews reviews={reviews} />
            </div>
         </div>
      </div>
   )
}
