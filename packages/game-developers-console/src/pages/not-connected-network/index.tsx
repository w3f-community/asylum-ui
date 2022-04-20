import { ReactComponent as DisconnectedIcon } from 'assets/svg/disconnected.svg'
import { Paragraph } from 'components/text/paragraph'
import * as React from 'react'

interface IProps {}

export const NotConnectedNetwork: React.FC<IProps> = () => {
   return (
      <div className="flex flex-col items-center justify-center m-auto h-[80%]">
         <DisconnectedIcon className="w-24 h-24 mb-6" />
         <Paragraph className="text-white text-center mb-6">
            Please, select endpoint to connect
         </Paragraph>
      </div>
   )
}
