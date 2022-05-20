import React from 'react'

import { observer } from 'mobx-react-lite'

import { AsylumApi, IAsylumApi } from '@asylum-ui/connection-library'

const apiProvider = React.createContext<IAsylumApi | null>(null)

interface IAsylumApiProvider {
   children: React.ReactNode
}

export const AsylumApiProvider: React.FC<IAsylumApiProvider> = observer(({ children }) => {
   return <apiProvider.Provider value={AsylumApi}>{children}</apiProvider.Provider>
})
