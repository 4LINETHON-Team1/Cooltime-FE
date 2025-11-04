import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import MainPage from './pages/MainPage'
import TestPage from '@/pages/TestPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <TestPage /> },
      { path: 'main', element: <MainPage /> },
      { path: 'test', element: <TestPage /> },
    ],
  },
])

export default router
