import React from 'react'

import { useNavigate } from 'react-router-dom'

import { ReactComponent as ArrowLeftIcon } from '../../assets/svg/arrow-left.svg'
import { Hr } from '../../components/hr'
import { HeadingXl } from '../../components/text/heading-xl'

interface IContent {
   title: string
   children: React.ReactNode
   headerButton?: React.ReactNode
   returnButton?: boolean
}

export const Page = ({ title, children, headerButton = null, returnButton = false }: IContent) => {
   const navigate = useNavigate()

   return (
      <div className="container mx-auto">
         <div className="flex justify-between items-center">
            <HeadingXl className="text-white self-start flex items-center gap-4">
               {returnButton && (
                  <ArrowLeftIcon
                     className="fill-white cursor-pointer"
                     onClick={() => navigate(-1)}
                  />
               )}
               {title}
            </HeadingXl>
            {headerButton}
         </div>
         <Hr />
         <div className="pt-6">{children}</div>
      </div>
   )
}
