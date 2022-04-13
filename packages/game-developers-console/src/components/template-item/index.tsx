import { Button } from 'components/button'
import { HeadingLg } from 'components/text/heading-lg'
import { Paragraph } from 'components/text/paragraph'
import * as React from 'react'
import { ITemplates } from 'types'
import emptyImage from 'assets/img/empty-img.jpg'

export const TemplateItem: React.FC<ITemplates> = ({ title, img, id, description, onActionClick = console.log, actionText = 'mint item' }) => {
   return (
      <div className="bg-white p-5 rounded-2xl gradient-hover-effect cursor-pointer">

         <HeadingLg>{title}</HeadingLg>
         <div className="py-3.5 aspect-square overflow-hidden">
            <img className="h-full w-full rounded-2xl aspect-square object-cover" src={img || emptyImage} alt="Your games" />
         </div>
         <Paragraph className="indent-2 text-gray-700 mb-4">
            {description}
         </Paragraph>
         <div className="flex flex-row justify-between items-center">
            <Paragraph className="text-gray-800">0xFR56.....F71D</Paragraph>
            <Button variant="dark" onClick={() => onActionClick(id)}>{actionText}</Button>
         </div>
      </div>
   )
}
