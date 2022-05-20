import React from 'react'

import './index.css'
import reportWebVitals from './reportWebVitals'
import { App } from 'App'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'

import { AsylumApiProvider } from 'context/api-provider'
import { StoreProvider } from 'store'
import { ScrollToTop } from 'utils/scroll-to-top'

const queryClient = new QueryClient()

const root = createRoot(document.getElementById('root') as HTMLDivElement)

root.render(
   <React.StrictMode>
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <ScrollToTop />
            <StoreProvider>
               <AsylumApiProvider>
                  <App />
               </AsylumApiProvider>
            </StoreProvider>
         </BrowserRouter>
      </QueryClientProvider>
   </React.StrictMode>
)

reportWebVitals()
