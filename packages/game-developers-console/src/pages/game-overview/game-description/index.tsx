import * as React from 'react'

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import { GameMetadata } from '@asylum-ui/connection-library'

import { Card } from 'components/card'
import { Heading } from 'components/text/heading'
import { HeadingLg } from 'components/text/heading-lg'
import { Paragraph } from 'components/text/paragraph'

interface IProps {
   game: GameMetadata
}

export const GameDescription: React.FC<IProps> = ({ game }) => {
   return (
      <Card className="mb-16">
         <HeadingLg className="mb-5">{game.title}</HeadingLg>
         <div className="flex flex-col">
            <div className="flex gap-9">
               <div className="basis-7/12">
                  <Paragraph className="mb-4">{game.shortDescription}</Paragraph>
                  <Carousel
                     className="demo-carousel overflow-hidden"
                     showIndicators={false}
                     showArrows={true}
                     showThumbs={true}
                     showStatus={false}
                  >
                     {game.gallery.slice(0, 5).map((imgSrc, index) => (
                        <div key={index}>
                           <img
                              src={imgSrc}
                              alt={game.title}
                              className="aspect-video object-cover object-center"
                           />
                        </div>
                     ))}
                  </Carousel>
               </div>
               <div className="basis-5/12">
                  <Heading className="mb-4">Description</Heading>
                  {game.description.split('\n').map((paragraph, index) => (
                     <Paragraph key={index} className="mb-3">
                        {paragraph}
                     </Paragraph>
                  ))}
               </div>
            </div>
         </div>
      </Card>
   )
}
