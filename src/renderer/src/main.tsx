import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import * as I18n from 'renderer/components/i18n'
import * as Theme from 'renderer/components/theme'
import router from './router'
import './root.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <I18n.Provider>
      <Theme.Provider>
        <RouterProvider router={router} />
      </Theme.Provider>
    </I18n.Provider>
  </React.StrictMode>
)
