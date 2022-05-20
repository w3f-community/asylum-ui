import * as React from 'react'

import classNames from 'classnames'
import { observer } from 'mobx-react-lite'

import { Button } from 'components/button'
import { ServerConnectModal } from 'modules/server-connect/server-connect-modal'
import { useStore } from 'store'
import { IComponentProps } from 'types'

interface IProps extends IComponentProps {}

export const ServerConnect: React.FC<IProps> = observer(({ className }) => {
   const store = useStore()
   const buttonText = store.network?.name || 'disconnected'
   const [open, setOpen] = React.useState(false)

   return (
      <div className={classNames(className)}>
         <Button
            variant="dark"
            size="sm"
            className="w-full flex items-center gap-2"
            onClick={() => setOpen(true)}
         >
            <span className="grow">{buttonText}</span>
            <span
               className={classNames('h-1 w-1 rounded-full', {
                  'bg-green-500': store.isConnected,
                  'bg-red-500': !store.isConnected,
               })}
            />
         </Button>
         <ServerConnectModal open={open} onClose={() => setOpen(false)} />
      </div>
   )
})
