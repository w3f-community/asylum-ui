import * as React from 'react'
import { forwardRef, useRef } from 'react'

import { Heading } from '../text/heading'
import classNames from 'classnames'
import ReactDOM from 'react-dom'

import { ReactComponent as CloseIcon } from 'assets/svg/close.svg'
import { IComponentProps } from 'types'

interface IProps extends IComponentProps {
   open?: boolean
   title?: React.ReactText
   children: React.ReactNode
   onClose?: () => void
   maxWidth?: 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

export const Modal: React.FC<IProps> = ({
   title,
   open = false,
   onClose,
   maxWidth = 'xl',
   children,
}) => {
   if (open) {
      document.body.style.overflow = 'hidden'
   } else {
      document.body.style.overflow = 'auto'
   }

   const modalRef = useRef<HTMLDivElement>(null)

   return ReactDOM.createPortal(
      <>
         <ModalOverlay
            onClose={onClose}
            className={classNames({
               'opacity-0 invisible': !open,
               'opacity-100 visible': open,
            })}
         >
            <ModalContent ref={modalRef} maxWidth={maxWidth}>
               <div className="flex align-middle justify-center relative py-3">
                  {title && <Heading className="text-white">{title}</Heading>}{' '}
                  <CloseIcon
                     className="cursor-pointer absolute right-1 top-1 fill-white hover:fill-asylum-magenta transition-all"
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

interface IModalOverlayProps extends IComponentProps {
   onClose?: () => void
}

const ModalOverlay: React.FC<IModalOverlayProps> = ({ onClose, className, children }) => {
   return (
      <div
         className={classNames(
            'fixed inset-0 z-30 flex items-center justify-center bg-gradient-overlay cursor-pointer transition-all overflow-auto py-4',
            className
         )}
         onClick={() => onClose && onClose()}
      >
         {children}
      </div>
   )
}
