import * as React from 'react'
import { useEffect } from 'react'

import { observer } from 'mobx-react-lite'
import { Route, Routes, useNavigate } from 'react-router-dom'

import { SidebarLayout } from 'layout/sidebar-layout'
import { GameItems } from 'pages/game-items'
import { GameOverview } from 'pages/game-overview'
import { GameSelection } from 'pages/game-selection'
import { GameTemplates } from 'pages/game-templates'
import { TemplateOverview } from 'pages/game-templates/template-overview'
import { NotConnectedNetwork } from 'pages/not-connected-network'
import { NotConnectedWallet } from 'pages/not-connected-wallet'
import { useStore } from 'store'

const AppRoutes = () => (
   <Routes>
      <Route path="/" element={<GameSelection />} />
      <Route path="overview" element={<GameOverview />} />
      <Route path="templates" element={<GameTemplates />} />
      <Route path="templates/:id" element={<TemplateOverview />} />
      <Route path="items" element={<GameItems />} />
   </Routes>
)

export const App = observer(() => {
   const store = useStore()
   const navigate = useNavigate()

   useEffect(() => {
      navigate('/')
   }, [store.account])

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
