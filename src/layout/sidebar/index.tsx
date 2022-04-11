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

interface IProps extends IComponentProps {}

export const Sidebar: React.FC<IProps> = observer(() => {
   const store = useStore()
   const navigate = useNavigate()
   const location = useLocation()

   return (
      <aside className="hidden basis-52 md:block lg:basis-72 shrink-0 h-screen sticky top-0 bg-white">
         <div className="flex flex-col items-center py-8 px-2 text-center gap-10">
            <Avatar size="lg" empty={!store.account} imgSrc={store.selectedGame?.img} />
            <div className="flex flex-col items-center text-center">
               <HeadingLg className="mb-2">{store.selectedGame?.title || ''}</HeadingLg>
               <Paragraph>{store.selectedGame?.description || ''}</Paragraph>
               <Button
                  size="sm"
                  variant="dark"
                  className="flex gap-2 items-center px-4 mt-4"
                  disabled={!store.selectedGame || !store.account}
               >
                  <PlayIcon className="fill-white" /> RUN
               </Button>
            </div>

            <nav className="flex flex-col max-w-4xl gap-4">
               <Button
                  variant="dark"
                  size="sm"
                  className="w-full"
                  onClick={() => navigate('/')}
                  active={location.pathname === '/'}
               >
                  select game
               </Button>
               <Button
                  variant="dark"
                  size="sm"
                  className="w-full"
                  onClick={() => navigate('/overview')}
                  active={location.pathname === '/overview'}
                  disabled={!store.selectedGame}
               >
                  game overview
               </Button>
               <Button
                  variant="dark"
                  size="sm"
                  className="w-full"
                  onClick={() => navigate('/templates')}
                  active={location.pathname === '/templates'}
                  disabled={!store.account}
               >
                  templates
               </Button>
               <Button
                  variant="dark"
                  size="sm"
                  className="w-full"
                  onClick={() => navigate('/items')}
                  active={location.pathname === '/items'}
                  disabled={!store.account}
               >
                  items
               </Button>
            </nav>
         </div>
      </aside>
   )
})
