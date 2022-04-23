import React from 'react'
import { AsylumApi, IAsylumApi } from '@asylum-ui/connection-library'
import { observer } from 'mobx-react-lite'

const apiProvider = React.createContext<IAsylumApi | null>(null)

export const AsylumApiProvider: React.FC = observer(({ children }) => {
   return <apiProvider.Provider value={AsylumApi}>{children}</apiProvider.Provider>
})
