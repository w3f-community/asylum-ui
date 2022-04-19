import * as React from 'react'
import { GameOverview } from 'pages/game-overview'
import { GameList } from 'pages/game-selection'
import { SidebarLayout } from 'layout/sidebar-layout'
import { Route, Routes } from 'react-router-dom'
import { GameTemplates } from 'pages/game-templates'
import { GameItems } from 'pages/game-items'
import { observer } from 'mobx-react-lite'
import { useStore } from 'store'
import { NotConnectedNetwork } from 'pages/not-connected-network'
import { NotConnectedWallet } from 'pages/not-connected-wallet'

const AppRoutes = () => (
   <Routes>
      <Route path="/" element={<GameList />} />
      <Route path="overview" element={<GameOverview />} />
      <Route path="templates" element={<GameTemplates />} />
      <Route path="items" element={<GameItems />} />
   </Routes>
)

export const App = observer(() => {
   const store = useStore()

   return (
      <SidebarLayout>
         {!store.isConnected ? (
            <NotConnectedNetwork />
         ) : !store.account ? (
            <NotConnectedWallet />
         ) : (
            <AppRoutes />
         )}
      </SidebarLayout>
   )
})
