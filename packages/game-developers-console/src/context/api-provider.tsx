import React from 'react'

import { observer } from 'mobx-react-lite'

import { AsylumApi, IAsylumApi } from '@asylum-ui/connection-library'

const apiProvider = React.createContext<IAsylumApi | null>(null)

export const AsylumApiProvider: React.FC = observer(({ children }) => {
   return <apiProvider.Provider value={AsylumApi}>{children}</apiProvider.Provider>
})
