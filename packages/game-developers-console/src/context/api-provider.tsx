import React, { useEffect } from 'react'
import { AsylumApi, IAsylumApi } from '@asylum-ui/connection-library'

const apiProvider = React.createContext<IAsylumApi | null>(null)

export const AsylumApiProvider: React.FC = ({ children }) => {
   const [api, setApi] = React.useState<IAsylumApi | null>(null)

   useEffect(() => {
      AsylumApi.load('ws://127.0.0.1:9944')
         .then((api: IAsylumApi) => setApi(api))
         .catch((e) => console.error(e))
   }, [])

   if (!api) {
      return (
         <div className="container mx-auto text-red-400">
            Cannot connect to substrate node. Network Error.
         </div>
      )
   }

   return <apiProvider.Provider value={api}>{children}</apiProvider.Provider>
}

export const useAsylumApi = (): IAsylumApi => {
   const api = React.useContext(apiProvider)
   if (!api) {
      throw new Error('useAsylumApi must be used within a AsylumApiProvider.')
   }
   return api
}
