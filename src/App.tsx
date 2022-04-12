import * as React from 'react'
import { GameOverview } from './pages/game-overview'
import { GameList } from './pages/game-selection'
import { SidebarLayout } from './layout/sidebar-layout'
import { Route, Routes } from 'react-router-dom'
import { GameTemplate } from 'pages/game-template'

export const App = () => {
   return (
      <SidebarLayout>
         <Routes>
            <Route path="/" element={<GameList />} />
            <Route path="overview" element={<GameOverview />} />
            <Route path="templates" element={<GameTemplate />} />
            <Route path="items" element={<div className="text-white">Items</div>} />
         </Routes>
      </SidebarLayout>
   )
}
