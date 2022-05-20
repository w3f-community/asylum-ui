import * as React from 'react'

import classNames from 'classnames'
import 'react-toastify/dist/ReactToastify.css'

import { Toast } from 'components/toast'
import { Header } from 'layout/header'
import { Sidebar } from 'layout/sidebar'
import { IComponentProps } from 'types'

interface IProps extends IComponentProps {
   children: React.ReactNode
}

export const SidebarLayout: React.FC<IProps> = ({ className, children }) => {
   return (
      <div className={classNames('flex min-h-screen max-h-screen overflow-hidden', className)}>
         <Sidebar />
         <main className="py-8 px-12 grow overflow-auto">
            <Header />
            <Toast className="md:left-28 lg:left-36" />
            {children}
         </main>
      </div>
   )
}
