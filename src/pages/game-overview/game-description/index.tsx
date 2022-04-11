import * as React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import imgPathFirst from './empty.png'
import imgPathSecond from './empty-img.png'
import { HeadingLg } from 'components/text/heading-lg'
import { Heading } from 'components/text/heading'
import { Paragraph } from 'components/text/paragraph'
import { Card } from 'components/card'

export const GameDescription = () => {
   return (
      <Card>
         <HeadingLg>Complete game name A</HeadingLg>
         <div className="flex mt-6 gap-9">
            <div className="basis-7/12 py-2">
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
                  <img src={imgPathFirst} alt="Your games" />
                  <img src={imgPathFirst} alt="Your games" />
                  <img src={imgPathFirst} alt="Your games" />
                  <img src={imgPathSecond} alt="Your games" />
                  <img src={imgPathFirst} alt="Your games" />
               </Carousel>
            </div>
            <div className="basis-5/12 p-2">
               <Heading className="mb-4">Description</Heading>
               <Paragraph className="mb-2">
                  {/* eslint-disable-next-line max-len */}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fermentum tellus
                  libero, vitae tristique lacus rutrum et. Duis fermentum, tortor mollis maximus
                  porttitor, leo elit semper nibh, vitae tincidunt justo magna vitae metus.
               </Paragraph>
               <br />
               <Paragraph>
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
