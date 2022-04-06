import * as React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Hr } from '../../components/hr'
import imgPathFirst from './empty-1.png'
import imgPathSecond from './empty-2.jpg'

export const GameOverview: React.FC = () => {
   return (
      <div className="page-bg page-width page-flex">
         <p
            className="text-header-of-page text-white text-oxanium "
         >Game overview</p>
         <Hr />
         <div className="bg-white rounded-[15px] p-[38px] w-full">
            <p className="article-header">
               Complete game name  A
            </p>
            <div className="flex mt-6 gap-9">
               <div className="basis-7/12 p-2">
                  <p
                     className="text-description-header"
                  >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  {/* <div className="empty-img w-full h-[240px]"></div> */}
                  <Carousel
                     className="demo-carousel rounded-[15px] overflow-hidden"
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
      </div>
   )
}
