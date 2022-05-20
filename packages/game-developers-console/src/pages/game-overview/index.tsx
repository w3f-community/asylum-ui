import * as React from 'react'

import { observer } from 'mobx-react-lite'

import { Hr } from 'components/hr'
import { HeadingXl } from 'components/text/heading-xl'
import { Paragraph } from 'components/text/paragraph'
import { Reviews } from 'pages/game-overview/reviews'
import { useStore } from 'store'
import { IComponentProps } from 'types'

import { Details } from './details'
import { GameDescription } from './game-description'

interface IProps extends IComponentProps {}

export const GameOverview: React.FC<IProps> = observer(() => {
   const store = useStore()

   if (!store.selectedGame) {
      return <Paragraph className="text-white">Game is not selected</Paragraph>
   }

   return (
      <div className="container mx-auto">
         <HeadingXl className="text-white self-start">Game overview</HeadingXl>
         <Hr />
         <div className="py-6">
            <GameDescription game={store.selectedGame} />
            <Details game={store.selectedGame} />
            <div className="flex flex-col">
               <Reviews reviews={store.selectedGame.reviews} />
            </div>
         </div>
      </div>
   )
})
