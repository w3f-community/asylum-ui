import * as React from 'react'

import { Header } from '../header'
import { Sidebar } from '../sidebar'
import { Toast } from 'components/toast'
import 'react-toastify/dist/ReactToastify.css'

import { IComponentProps } from 'types'

interface IProps extends IComponentProps {}

export const SidebarLayout: React.FC<IProps> = ({ children }) => {
   return (
      <div className="flex bg-gray-700 min-h-screen">
         <Sidebar />
         <main className="py-8 px-12 grow">
            <Header />
            <Toast className="md:left-28 lg:left-36" />
            {children}
         </main>
      </div>
   )
}
