import { createBrowserRouter } from 'react-router-dom'
import Home from 'renderer/pages/home'

const router = createBrowserRouter([
  {
    path: '*',
    element: <Home />
  }
])

export default router
