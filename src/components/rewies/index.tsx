import { Avatar } from 'components/avatar'
import { Card } from 'components/card'
import { RatingStar } from 'components/ratind-star'
import { Paragraph } from 'components/text/paragraph'
import * as React from 'react'

interface IProps { }

export const Rewies: React.FC<IProps> = () => {
   return (
      <Card>
         <div className="flex flex-row">

            <div className="basis-7/10 flex flex-col gap-3">
               <div className="flex items-center">
                  <Avatar />
                  <div className="pl-4">
                     <Paragraph>0x53D3.....G4T8</Paragraph>
                  </div>
               </div>
               {/* eslint-disable-next-line max-len */}
               <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Fusce fermentum tellus libero, vitae tristique lacus rutrum et. </Paragraph>
            </div>
            <div className="basis-3/10" >
               <RatingStar rating={3} />
            </div>
         </div>
      </Card>
   )
}
