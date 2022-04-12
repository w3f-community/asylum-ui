import * as React from 'react'
import { Button } from 'components/button'
import { Card } from 'components/card'
import { Heading } from 'components/text/heading'
import { HeadingXl } from 'components/text/heading-xl'
import { Paragraph } from 'components/text/paragraph'
import { HeadingLg } from 'components/text/heading-lg'

interface IProps { }

export const Details: React.FC<IProps> = () => {
   return (
      <Card>
         <HeadingLg className="mb-5">
            Details
         </HeadingLg>
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
            <Button className="bg-gray-700" >Show All templates</Button>

         </div>
      </Card>
   )
}
