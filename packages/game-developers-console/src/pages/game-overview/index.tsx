import React from 'react'

import { observer } from 'mobx-react-lite'

import { Page } from '../../layout/page'
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
      <Page title="Game overview">
         <GameDescription game={store.selectedGame} />
         <Details game={store.selectedGame} />
         <div className="flex flex-col">
            <Reviews reviews={store.selectedGame.reviews} />
         </div>
      </Page>
   )
})
