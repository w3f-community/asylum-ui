import React from 'react'

import AppStore, { IAppStore } from './app-store'

interface IStoreProviderProps {
   children: React.ReactNode
}

const storeContext = React.createContext<IAppStore | null>(null)

export const StoreProvider: React.FC<IStoreProviderProps> = ({ children }) => {
   return <storeContext.Provider value={AppStore}>{children}</storeContext.Provider>
}

export const useStore = (): IAppStore => {
   const store = React.useContext(storeContext)
   if (!store) {
      throw new Error('useStore must be used within a StoreProvider.')
   }
   return store
}
