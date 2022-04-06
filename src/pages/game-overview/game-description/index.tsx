import * as React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import imgPathFirst from './empty-1.png'
import imgPathSecond from './empty-2.jpg'

export const GameDescription = () => {
   return (
      <div className="bg-white rounded-2xl p-9 w-full">
         <p className="article-header">
               Complete game name  A
         </p>
         <div className="flex mt-6 gap-9">
            <div className="basis-7/12 p-2">
               <p
                  className="text-description-header"
               >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
               <Carousel
                  className="demo-carousel rounded-2xl overflow-hidden"
                  showIndicators={false}
                  showArrows={true}
                  showThumbs={true}
                  showStatus={false}
               >
                  {/* @ts-ignore */}
                  <img src={imgPathFirst} alt="Your games" />
                  <img src={imgPathFirst} alt="Your games" />
                  <img src={imgPathFirst} alt="Your games" />
                  <img src={imgPathSecond} alt="Your games" />
                  <img src={imgPathFirst} alt="Your games" />
               </Carousel>
            </div>
            <div className="basis-5/12 p-2">
               <p className="text-description-header">Description</p>
               <p className="text-description">
                  {/* eslint-disable-next-line max-len */}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fermentum tellus libero, vitae tristique lacus rutrum et. Duis fermentum, tortor mollis maximus porttitor, leo elit semper nibh, vitae tincidunt justo magna vitae metus.
                  <br/><br/>
                  {/* eslint-disable-next-line max-len */}
                  Nulla quis dignissim dolor. Sed scelerisque sapien purus, id eleifend neque sodales et. Cras faucibus vehicula purus in volutpat. Duis posuere eros ac rhoncus lacinia. Vestibulum elit ipsum, mollis pharetra erat id, volutpat tristique magna. Mauris eu blandit elit. Phasellus nec condimentum nibh. In hac habitasse platea dictumst. Nunc consectetur odio ante, id rutrum elit pulvinar vel.Vestibulum elit ipsum, mollis pharetra erat id, volutpat tristique magna.
               </p>
            </div>
         </div>
      </div>
   )
}
