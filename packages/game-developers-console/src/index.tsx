import React from 'react'

import './index.css'
import reportWebVitals from './reportWebVitals'
import { App } from 'App'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'

import { AsylumApiProvider } from 'context/api-provider'
import { StoreProvider } from 'store'
import { ScrollToTop } from 'utils/scroll-to-top'

const queryClient = new QueryClient()

ReactDOM.render(
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
   </React.StrictMode>,
   document.getElementById('root')
)

reportWebVitals()
