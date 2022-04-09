import * as React from 'react'
import { Button } from '../button'
import { Card } from '../card'
import { Heading } from '../text/heading'
import { HeadingXl } from '../text/heading-xl'
import { Paragraph } from '../text/paragraph'

interface IProps { }

export const Details: React.FC<IProps> = () => {
   return (
      <Card>
         <HeadingXl color="black">
            Details
         </HeadingXl>
         <div className="flex flex-row justify-between">
            <div className="grow">
               <Heading>Number of players:</Heading>
               <Paragraph>2085</Paragraph>
            </div>
            <div className="grow">
               <Heading>Minted items:</Heading>
               <Paragraph>2085</Paragraph>
            </div>
            <div className="grow">
               <Heading>Assosiated templates:</Heading>
               <Paragraph>2085</Paragraph>
            </div>
            {/* <button>Show All templates</button> */}
            <Button variant="dark">Show All templates</Button>

         </div>
      </Card>
   )
}
