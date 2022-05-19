import * as React from 'react'
import { useEffect } from 'react'

import classNames from 'classnames'
import { Button } from 'components/button'
import { observer } from 'mobx-react-lite'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Unity, { UnityContext } from 'react-unity-webgl'

import { ReactComponent as ArrowUpIcon } from 'assets/svg/arrow-up.svg'
import { SidebarLayout } from 'layout/sidebar-layout'
import { GameItems } from 'pages/game-items'
import { GameOverview } from 'pages/game-overview'
import { GameSelection } from 'pages/game-selection'
import { GameTemplates } from 'pages/game-templates'
import { TemplateOverview } from 'pages/game-templates/template-overview'
import { NotConnectedNetwork } from 'pages/not-connected-network'
import { NotConnectedWallet } from 'pages/not-connected-wallet'
import { useStore } from 'store'

import { AsylumApi } from '@asylum-ui/connection-library'

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

   const unityContext = new UnityContext({
      productName: 'Asylum 2D Platformer',
      companyName: 'Asylum',
      // The url's of the Unity WebGL runtime, these paths are public and should be
      // accessible from the internet and relative to the index.html.
      loaderUrl: 'unity/platformer/AsylumPrB_WEBBuildWOCompression.loader.js',
      dataUrl: 'unity/platformer/AsylumPrB_WEBBuildWOCompression.data',
      frameworkUrl: 'unity/platformer/AsylumPrB_WEBBuildWOCompression.framework.js',
      codeUrl: 'unity/platformer/AsylumPrB_WEBBuildWOCompression.wasm',
      // Additional configuration options.
      webglContextAttributes: {
         preserveDrawingBuffer: true,
      },
   })

   const [loaded, setLoaded] = React.useState(false)

   useEffect(() => {
      if (store.isGameRunning) {
         setTimeout(() => {
            setLoaded(true)
         }, 500)
      } else {
         setLoaded(false)
      }
   }, [store.isGameRunning])

   async function sendTemplates() {
      const templatesJson = await AsylumApi.templates()
      // hack to parse array of objects in Unity
      const unityMessage = '{ "Items" :' + JSON.stringify(templatesJson) + '}'
      unityContext.send('ReactController', 'ParseItems', unityMessage)
   }

   useEffect(() => {
      if (loaded) {
         unityContext.on('GetAllUserItems', async () => {
            sendTemplates()
         })
      }
   }, [loaded])

   return (
      <>
         <div className="absolute min-h-screen inset-0 z-0">
            {loaded && (
               <Unity className="absolute inset-0 w-full h-full" unityContext={unityContext} />
            )}
            <Button
               className="!absolute bottom-0 left-0 opacity-50 hover:opacity-100 !p-2"
               onClick={() => store.setIsInterfaceOpen(true)}
            >
               <ArrowUpIcon className="group-hover:fill-white" />
            </Button>
         </div>
         <SidebarLayout
            className={classNames('flex relative', {
               'animate-slide-out': !store.isInterfaceOpen && store.isGameRunning,
               'animate-slide-in': store.isInterfaceOpen && store.isGameRunning,
            })}
         >
            {!store.isConnected ? (
               <NotConnectedNetwork />
            ) : !store.account ? (
               <NotConnectedWallet />
            ) : (
               <AppRoutes />
            )}
         </SidebarLayout>
      </>
   )
})
