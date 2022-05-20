import React from 'react'

import { Button } from 'components/button'
import { HeadingLg } from 'components/text/heading-lg'
import { Paragraph } from 'components/text/paragraph'
import { formatAddress } from 'utils'

interface IListCardItem {
   title: string
   img: string
   id: string
   description: string
   address: string
   onClick?: (id: string) => void
   onActionClick?: (id: string) => void
   actionText?: string
}

export const ListCardItem = ({
   title,
   img,
   id,
   address,
   description,
   onClick,
   onActionClick,
   actionText,
}: IListCardItem) => {
   return (
      <div
         className="bg-white p-5 rounded-2xl gradient-hover-effect cursor-pointer group flex flex-col"
         onClick={() => onClick && onClick(id)}
      >
         <HeadingLg className="group-hover:text-white">{title}</HeadingLg>
         <div className="py-3.5 aspect-square overflow-hidden">
            <img
               className="h-full w-full rounded-2xl aspect-square object-cover"
               src={img || '/img/empty-img.jpg'}
               alt="Your games"
            />
         </div>
         <div className="flex flex-col justify-between grow">
            <Paragraph className="mb-4 group-hover:text-white line-clamp-2 min-h-[2em]">
               {description}
            </Paragraph>
            <div className="flex flex-row justify-between items-center">
               <Paragraph className="group-hover:text-white">{formatAddress(address)}</Paragraph>
               <Button
                  variant="dark"
                  className="before:hidden hover:bg-white hover:text-gray-700"
                  onClick={(e) => {
                     e.stopPropagation()
                     onActionClick && onActionClick(id)
                  }}
               >
                  {actionText}
               </Button>
            </div>
         </div>
      </div>
   )
}
