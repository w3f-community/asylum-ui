import * as React from 'react'
import { Heading } from '../text/heading'
import { IComponentProps } from 'types'
import { ReactComponent as CloseIcon } from 'assets/svg/close.svg'
import { Transition } from '@headlessui/react'
import { forwardRef, useRef } from 'react'
import { useClickOutsideCallback } from 'hooks'

interface IProps extends IComponentProps {
   open?: boolean
   title?: React.ReactText
   children: React.ReactNode
   onClose?: () => void
}

export const Modal: React.FC<IProps> = ({ title, open = false, onClose, children }) => {
   if (open) {
      document.body.style.overflow = 'hidden'
   } else {
      document.body.style.overflow = 'auto'
   }

   const modalRef = useRef<HTMLDivElement>(null)
   useClickOutsideCallback(modalRef, onClose)

   return (
      <Transition
         show={open}
         enter="transition-opacity duration-150"
         enterFrom="opacity-0"
         enterTo="opacity-100"
         leave="transition-opacity duration-75"
         leaveFrom="opacity-100"
         leaveTo="opacity-0"
      >
         <ModalOverlay>
            <ModalContent ref={modalRef}>
               <div className="flex align-middle justify-center relative py-3">
                  {title && <Heading className="text-white">{title}</Heading>}{' '}
                  <CloseIcon
                     className="cursor-pointer absolute right-1 top-1 fill-white icon-hover-effect"
                     onClick={() => onClose && onClose()}
                  />
               </div>
               {children}
            </ModalContent>
         </ModalOverlay>
      </Transition>
   )
}

const ModalContent = forwardRef<HTMLDivElement, IProps>(({ children }, ref) => (
   <div ref={ref} className="bg-gray-700 rounded-3xl p-4 text-white w-full max-w-xl cursor-auto">
      {children}
   </div>
))
ModalContent.displayName = 'ModalContent'

interface IModalOverlayProps extends IComponentProps {}

const ModalOverlay: React.FC<IModalOverlayProps> = ({ children }) => {
   return (
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-gradient-overlay ml-72 cursor-pointer">
         {children}
      </div>
   )
}
