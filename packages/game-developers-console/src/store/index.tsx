import React from 'react'

import AppStore, { IAppStore } from './app-store'

const storeContext = React.createContext<IAppStore | null>(null)

export const StoreProvider: React.FC = ({ children }) => {
   return <storeContext.Provider value={AppStore}>{children}</storeContext.Provider>
}

export const useStore = (): IAppStore => {
   const store = React.useContext(storeContext)
   if (!store) {
      throw new Error('useStore must be used within a StoreProvider.')
   }
   return store
}
