import * as React from 'react'

import classNames from 'classnames'
import { Slide, ToastContainer } from 'react-toastify'

import { ReactComponent as CloseIcon } from 'assets/svg/close.svg'
import { IComponentProps } from 'types'

interface IProps extends IComponentProps {}

const CloseButton = (props: { closeToast: React.MouseEventHandler<SVGSVGElement> | undefined }) => (
   <CloseIcon
      onClick={props.closeToast}
      className="mr-1 hover:fill-asylum-magenta transition-all cursor-pointer fill-gray-400"
   />
)

export const Toast: React.FC<IProps> = ({ className }) => {
   return (
      <>
         {/* <Button onClick={() => toast.success('success')}>success</Button> */}
         {/* <Button onClick={() => toast.error('error')}>success</Button> */}
         <ToastContainer
            toastClassName={() =>
               classNames(
                  'relative bg-white rounded-xl flex items-center text-gray-700 justify-between overflow-hidden py-2 px-4 text-md',
                  className
               )
            }
            closeButton={CloseButton}
            transition={Slide}
            bodyClassName={() => 'overflow-hidden w-full flex items-center gap-2 py-1'}
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
         />
      </>
   )
}
