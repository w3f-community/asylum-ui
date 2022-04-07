import * as React from 'react'
import { Link } from 'react-router-dom'

interface IProps {
}

export const Sidebar: React.FC<IProps> = () => (
   <aside className="basis-72 shrink-0 h-screen sticky top-0 bg-white text-center">
      <nav className="flex flex-col p-12">
         <Link to="/">Select Game</Link>
         <Link to="/overview">Game Overview</Link>
      </nav>
   </aside>
)
