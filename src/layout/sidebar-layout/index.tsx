import { Sidebar } from '../sidebar'
import { Header } from '../header'
import * as React from 'react'
import { IComponentProps } from 'types'

interface IProps extends IComponentProps {}

export const SidebarLayout: React.FC<IProps> = ({ children }) => (
   <div className="flex">
      <Sidebar />
      <main className="bg-gray-700 p-14 grow">
         <Header />
         {children}
      </main>
   </div>
)
