import { createBrowserRouter } from 'react-router-dom'
import Home from 'renderer/pages/home'
import Read from 'renderer/pages/read'
import Create from 'renderer/pages/create'

const router = createBrowserRouter([
  {
    path: '/read',
    element: <Read />
  },
  {
    path: '/create',
    element: <Create />
  },
  {
    path: '*',
    element: <Home />
  }
])

export default router
