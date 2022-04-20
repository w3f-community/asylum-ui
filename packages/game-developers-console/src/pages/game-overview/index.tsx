import * as React from 'react'
import { Details } from './details'
import { Hr } from 'components/hr'
import { HeadingXl } from 'components/text/heading-xl'
import { GameDescription } from './game-description'
import { IComponentProps } from 'types'
import { Reviews } from 'pages/game-overview/reviews'
import { reviews } from 'context/mocks'
import { observer } from 'mobx-react-lite'
import { useStore } from 'store'
import { Paragraph } from 'components/text/paragraph'

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
            <Details />
            <div className="flex flex-col">
               <Reviews reviews={reviews} />
            </div>
         </div>
      </div>
   )
})
