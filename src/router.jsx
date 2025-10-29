import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import MainPage from './pages/MainPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'main', element: <MainPage /> },
    ],
  },
])

export default router
