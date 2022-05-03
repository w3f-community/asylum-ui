import * as React from 'react'

import classNames from 'classnames'
import { Button } from 'components/button'
import { Modal } from 'components/modal'
import { Paragraph } from 'components/text/paragraph'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

import { AsylumApi } from '@asylum-ui/connection-library'

import { useStore } from 'store'
import { INetwork } from 'types'

interface IProps {
   open: boolean
   onClose?: () => void
}

const LOCAL_NODE: INetwork = {
   name: 'local node',
   endpoint: 'ws://127.0.0.1:9944',
}

export const ServerConnectModal: React.FC<IProps> = observer(({ open, onClose }) => {
   const store = useStore()
   const navigate = useNavigate()

   const [error, setError] = React.useState<string | null>(null)

   const onConnected = (network: INetwork) => {
      setError(null)
      store.setNetwork(network)
      store.setIsConnected(true)
      onClose && onClose()
   }
   const onDisconnected = () => {
      store.clear()
      navigate('/')
   }
   const handleDisconnect = async () => {
      onClose && onClose()
      await AsylumApi.disconnect()
      onDisconnected()
   }

   const handleSelectNode = async (network: INetwork) => {
      setError(null)
      try {
         await AsylumApi.connect(network.endpoint, () => onConnected(network), onDisconnected)
      } catch (e) {
         setTimeout(
            () => setError('Cannot connect to the endpoint: ' + network.endpoint + '. Try again.'),
            200
         )
      }
   }
   return (
      <Modal open={open} title="Connect to Node" onClose={onClose}>
         <div className="p-7">
            <div className="flex flex-col gap-4">
               <Button
                  variant="light"
                  size="lg"
                  className="w-full text-left flex items-center justify-between group"
                  error={Boolean(error)}
                  onClick={() => handleSelectNode(LOCAL_NODE)}
               >
                  <div className="flex gap-3 items-center">
                     <span
                        className={classNames('h-2 w-2 rounded-full', {
                           'bg-green-500':
                              store.network?.endpoint === LOCAL_NODE.endpoint && store.isConnected,
                           'bg-red-500':
                              store.network?.endpoint !== LOCAL_NODE.endpoint || !store.isConnected,
                        })}
                     />
                     {LOCAL_NODE.name}
                  </div>
                  <span className="text-gray-400 group-hover:text-white">
                     {LOCAL_NODE.endpoint}
                  </span>
               </Button>
               {error && <Paragraph className="text-center text-red-400">{error}</Paragraph>}

               <Button variant="dark" size="sm" className="w-full mt-4" onClick={handleDisconnect}>
                  disconnect
               </Button>
            </div>
         </div>
      </Modal>
   )
})
