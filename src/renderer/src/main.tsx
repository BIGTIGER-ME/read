import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { SWRConfig } from 'swr'
import * as I18n from 'renderer/components/i18n'
import * as Theme from 'renderer/components/theme'
import router from './router'
import './root.css'

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  window.api.system.showPopupMenu()
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SWRConfig value={{ provider: () => new Map() }}>
      <I18n.Provider>
        <Theme.Provider>
          <RouterProvider router={router} />
        </Theme.Provider>
      </I18n.Provider>
    </SWRConfig>
  </React.StrictMode>
)
