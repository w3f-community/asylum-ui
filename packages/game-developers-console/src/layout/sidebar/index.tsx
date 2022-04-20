import * as React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { IComponentProps } from 'types'
import { Avatar } from 'components/avatar'
import { HeadingLg } from 'components/text/heading-lg'
import { Paragraph } from 'components/text/paragraph'
import { Button } from 'components/button'
import { ReactComponent as PlayIcon } from 'assets/svg/play.svg'
import { observer } from 'mobx-react-lite'
import { useStore } from 'store'
import { ServerConnect } from 'modules/server-connect'

interface IProps extends IComponentProps {}

export const Sidebar: React.FC<IProps> = observer(() => {
   const store = useStore()
   const navigate = useNavigate()
   const location = useLocation()

   return (
      <aside className="hidden basis-52 md:block lg:basis-72 shrink-0 h-screen sticky z-30 top-0 z-40">
         <div className="flex flex-col items-center py-8 px-2 text-center gap-7 h-full before:bg-white before:rounded-t-3xl before:absolute before:inset-0 before:top-24 before:-z-10">
            <Avatar
               className="min-h-[176px]"
               size="lg"
               empty={!store.account}
               imgSrc={store.selectedGame?.img}
            />
            <div className="flex flex-col items-center text-center">
               <HeadingLg className="mb-2">{store.selectedGame?.title || ''}</HeadingLg>
               <Paragraph>{store.selectedGame?.genre || ''}</Paragraph>
               <Button
                  size="sm"
                  variant="dark"
                  className="flex gap-2 items-center px-4 mt-4"
                  disabled={!store.selectedGame || !store.account}
               >
                  <PlayIcon className="fill-white" /> RUN
               </Button>
            </div>

            <nav className="flex flex-col w-full gap-4 grow max-w-3xl px-9">
               <Button
                  variant="dark"
                  size="sm"
                  className="w-full"
                  onClick={() => navigate('/')}
                  active={location.pathname === '/' && store.isConnected}
                  disabled={!store.isConnected}
               >
                  select game
               </Button>
               <Button
                  variant="dark"
                  size="sm"
                  className="w-full"
                  onClick={() => navigate('/overview')}
                  active={location.pathname === '/overview' && store.isConnected}
                  disabled={!store.selectedGame || !store.account || !store.isConnected}
               >
                  game overview
               </Button>
               <Button
                  variant="dark"
                  size="sm"
                  className="w-full"
                  onClick={() => navigate('/templates')}
                  active={location.pathname === '/templates' && store.isConnected}
                  disabled={!store.selectedGame || !store.account || !store.isConnected}
               >
                  templates
               </Button>
               <Button
                  variant="dark"
                  size="sm"
                  className="w-full"
                  onClick={() => navigate('/items')}
                  active={location.pathname === '/items' && store.isConnected}
                  disabled={!store.selectedGame || !store.account || !store.isConnected}
               >
                  items
               </Button>
               <ServerConnect className="self-end mt-auto w-full" />
            </nav>
         </div>
      </aside>
   )
})
