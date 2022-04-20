import { Sidebar } from '../sidebar'
import { Header } from '../header'
import * as React from 'react'
import { IComponentProps } from 'types'

interface IProps extends IComponentProps {}

export const SidebarLayout: React.FC<IProps> = ({ children }) => (
   <div className="flex bg-gray-700 min-h-screen">
      <Sidebar />
      <main className="py-8 px-12 grow">
         <Header />
         {children}
      </main>
   </div>
)
