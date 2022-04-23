import * as React from 'react'
import { Button } from 'components/button'
import { Card } from 'components/card'
import { Heading } from 'components/text/heading'
import { Paragraph } from 'components/text/paragraph'
import { HeadingLg } from 'components/text/heading-lg'
import { useAsylumApi } from 'hooks'
import { fetchPlayersCount } from 'api'
import { GameWithMetadata } from 'store/app-store'
import { useNavigate } from 'react-router-dom'

interface IProps {
   game: GameWithMetadata
}

export const Details: React.FC<IProps> = ({ game }) => {
   const { data: playersNumber } = useAsylumApi(fetchPlayersCount())
   const navigate = useNavigate()

   return (
      <Card className="mb-16">
         <HeadingLg className="mb-5">Details</HeadingLg>
         <div className="flex flex-row justify-between">
            <div className="grow">
               <Heading>Number of players:</Heading>
               <Paragraph className="font-secondary">{playersNumber}</Paragraph>
            </div>
            <div className="grow">
               <Heading>Minted items:</Heading>
               <Paragraph className="font-secondary">0</Paragraph>
            </div>
            <div className="grow">
               <Heading>Associated templates:</Heading>
               <Paragraph className="font-secondary">{game.templates?.length || 0}</Paragraph>
            </div>
            <Button variant="dark" onClick={() => navigate('/templates')}>
               show all templates
            </Button>
         </div>
      </Card>
   )
}
