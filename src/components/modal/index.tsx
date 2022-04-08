import * as React from 'react'
import { Heading } from '../text/heading'
import { IComponentProps } from 'types'

interface IProps extends IComponentProps {
   open?: boolean
   title?: React.ReactText
   children: React.ReactNode
}

export const Modal: React.FC<IProps> = ({ title, open = false, children }) => {
   if (open) {
      document.body.style.overflow = 'hidden'

      return (
         <ModalOverlay>
            <ModalContent>
               <div>{title && <Heading className="text-white">{title}</Heading>}</div>
               {children}
            </ModalContent>
         </ModalOverlay>
      )
   }

   return <></>
}

const ModalContent: React.FC<IProps> = ({ children }) => (
   <div className="bg-gray-700 rounded-3xl p-4 text-white">{children}</div>
)

const ModalOverlay: React.FC<IProps> = ({ children }) => (
   <div className="fixed inset-0 z-10 flex items-center justify-center bg-gradient-overlay ml-72">
      {children}
   </div>
)
