import * as React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { HeadingLg } from 'components/text/heading-lg'
import { Heading } from 'components/text/heading'
import { Paragraph } from 'components/text/paragraph'
import { Card } from 'components/card'

export const GameDescription = () => {
   return (
      <Card>
         <HeadingLg className="mb-5">Complete game name A</HeadingLg>
         <div className="flex gap-9">
            <div className="basis-7/12">
               <Heading className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
               </Heading>
               <Carousel
                  className="demo-carousel overflow-hidden"
                  showIndicators={false}
                  showArrows={true}
                  showThumbs={true}
                  showStatus={false}
               >
                  <img
                     src="https://static-assets-prod.epicgames.com/fortnite/static/webpack/8f9484f10eb14f85a189fb6117a57026.jpg"
                     className="aspect-video object-cover object-center"
                     alt="Your games"
                  />
                  <img
                     src="https://images.nintendolife.com/screenshots/90272/large.jpg"
                     className="aspect-video object-cover object-center"
                     alt="Your games"
                  />
                  <img
                     src="https://cdn2.unrealengine.com/Fortnite%2Fblog%2Fphotography-blog%2Fpic2-1600x900-775a0694cc0b0f854ef48399ebc33a2db0bac25c.png"
                     className="aspect-video object-cover object-center"
                     alt="Your games"
                  />
                  <img
                     src="https://thefortnitegame.com/images/uploads/products/1/k3h5H_screen_1.jpg"
                     className="aspect-video object-cover object-center"
                     alt="Your games"
                  />
                  <img
                     src="https://www.usitility.com/media/software/screenshots/screenshot-fortnite-battle-royale-13268.webp"
                     className="aspect-video object-cover object-center"
                     alt="Your games"
                  />
               </Carousel>
            </div>
            <div className="basis-5/12">
               <Heading className="mb-4">Description</Heading>
               <Paragraph className="mb-2">
                  {/* eslint-disable-next-line max-len */}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fermentum tellus
                  libero, vitae tristique lacus rutrum et. Duis fermentum, tortor mollis maximus
                  porttitor, leo elit semper nibh, vitae tincidunt justo magna vitae metus.
                  <br />
                  <br />
                  {/* eslint-disable-next-line max-len */}
                  Nulla quis dignissim dolor. Sed scelerisque sapien purus, id eleifend neque
                  sodales et. Cras faucibus vehicula purus in volutpat. Duis posuere eros ac rhoncus
                  lacinia. Vestibulum elit ipsum, mollis pharetra erat id, volutpat tristique magna.
                  Mauris eu blandit elit. Phasellus nec condimentum nibh. In hac habitasse platea
                  dictumst. Nunc consectetur odio ante, id rutrum elit pulvinar vel.Vestibulum elit
                  ipsum, mollis pharetra erat id, volutpat tristique magna.
               </Paragraph>
            </div>
         </div>
      </Card>
   )
}
