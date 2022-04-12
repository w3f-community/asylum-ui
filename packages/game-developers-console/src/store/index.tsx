import React from 'react'
import AppStore from './app-store'

const storeContext = React.createContext<typeof AppStore | null>(null)

export const StoreProvider: React.FC = ({ children }) => {
   return <storeContext.Provider value={AppStore}>{children}</storeContext.Provider>
}

export const useStore = (): typeof AppStore => {
   const store = React.useContext(storeContext)
   if (!store) {
      throw new Error('useStore must be used within a StoreProvider.')
   }
   return store
}
