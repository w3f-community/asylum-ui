import { Card } from 'components/card'
import * as React from 'react'
import { ReactComponent as EditIcon } from 'assets/svg/edit.svg'
import { ReactComponent as TrashIcon } from 'assets/svg/trash.svg'
import { Button } from 'components/button'
import { Heading } from 'components/text/heading'
import { Paragraph } from 'components/text/paragraph'
import { IInterpretation } from 'types'

interface IProps extends IInterpretation {}

export const Interpretation: React.FC<IProps> = ({ description, name, properties, type, img }) => {
   return (
      <Card className="mb-14">
         <div
            className="relative left-full h-0 cursor-pointer"
            onClick={() => console.log('edit name : ', name)}
         >
            <EditIcon />
         </div>
         <div
            className="relative left-[93%] top-[-1px] h-0 cursor-pointer"
            onClick={() => console.log('trash name : ', name)}
         >
            <TrashIcon />
         </div>
         <div className="flex flex-row gap-8">
            <div className="flex flex-col gap-5 w-44 min-w-20">
               <img className="aspect-square object-cover" src={img} alt="your interpretation" />
               <Button variant="dark" className="w-full">
                  SOURCE
               </Button>
            </div>
            <div className="flex flex-col gap-4 h-60 overflow-auto no-scrollbar">
               <Heading>Description :</Heading>
               <Paragraph>{description}</Paragraph>
               <Heading>Properties :</Heading>
               {Object.entries(properties).map((item, index) => {
                  return (
                     <Paragraph key={index}>
                        {item[0]}: {item[1]}
                     </Paragraph>
                  )
               })}
            </div>
         </div>
      </Card>
   )
}
