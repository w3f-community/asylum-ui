import React, { forwardRef, useEffect, useRef, useState } from 'react'

import { Heading } from '../text/heading'
import classNames from 'classnames'
import ReactDOM from 'react-dom'

import { ReactComponent as CloseIcon } from 'assets/svg/close.svg'
import { IComponentProps } from 'types'

interface IProps extends IComponentProps {
   title?: React.ReactText
   open?: boolean
   onClose?: () => void
   maxWidth?: 'md' | 'lg' | 'xl' | '2xl' | 'full'
   children: React.ReactNode
}

export const Modal: React.FC<IProps> = ({
   title,
   open: isOpen = false,
   onClose,
   maxWidth = 'xl',
   children,
}) => {
   const modalRef = useRef<HTMLDivElement>(null)

   return ReactDOM.createPortal(
      <>
         <ModalOverlay
            isOpen={isOpen}
            onClose={onClose}
         // className={classNames({
         //    'opacity-0 invisible pointer-events-none': !isOpen,
         //    'opacity-100 visible': isOpen,
         // })}
         >
            <ModalContent ref={modalRef} maxWidth={maxWidth}>
               <div className="flex align-middle justify-center relative py-3">
                  {title && <Heading className="text-white">{title}</Heading>}{' '}
                  <CloseIcon
                     className="cursor-pointer absolute right-1 top-1 fill-white hover:fill-asylum-magenta transition"
                     onClick={() => onClose && onClose()}
                  />
               </div>
               {children}
            </ModalContent>
         </ModalOverlay>
      </>,
      // @ts-ignore
      document.getElementById('modal-root')
   )
}

interface IModalOverlayProps extends IComponentProps {
   isOpen: boolean
   onClose?: () => void
}

const ModalOverlay: React.FC<IModalOverlayProps> = ({ isOpen, onClose, className, children }) => {
   const [shouldRender, setShouldRender] = useState(isOpen)

   useEffect(() => {
      if (isOpen) setShouldRender(true)
   })

   const handleTransitionEnd = () => {
      console.log('transition Ended')

      if (!isOpen) setShouldRender(false)
   }

   document.body.style.overflow = (!isOpen ? 'hidden' : '')

   return (
      shouldRender
         ? <div
            className={classNames(
               `fixed inset-0 z-30 flex items-center justify-center bg-gradient-overlay ${isOpen ? 'opacity-100' : 'opacity-0'} cursor-pointer transition overflow-auto py-4`,
               className
            )}
            onClick={() => onClose && onClose()}
            onTransitionEnd={handleTransitionEnd}
         >
            {children}
         </div>
         : null
   )
}

const ModalContent = forwardRef<HTMLDivElement, IProps>(({ maxWidth, children }, ref) => {
   return (
      <div
         onClick={(e) => e.stopPropagation()}
         ref={ref}
         className={classNames(
            'bg-gray-700 rounded-3xl p-4 text-white w-full cursor-auto md:ml-52 lg:ml-72 mt-auto mb-auto',
            {
               'max-w-md': maxWidth === 'md',
               'max-w-lg': maxWidth === 'lg',
               'max-w-xl': maxWidth === 'xl',
               'max-w-2xl': maxWidth === '2xl',
               'max-w-full': maxWidth === 'full',
            }
         )}
      >
         {children}
      </div>
   )
})

ModalContent.displayName = 'ModalContent'
