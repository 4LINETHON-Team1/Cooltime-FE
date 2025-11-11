import './App.css'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import ThemeGate from './hooks/ThemeGate'

function App() {
  const hasToken = !!localStorage.getItem('accessToken')
  const location = useLocation()

  const publicPaths = ['/start', '/login', '/signup']

  if (!hasToken && !publicPaths.includes(location.pathname)) {
    return <Navigate to='/start' replace />
  }

  return (
    <>
      <ThemeGate />
      <Outlet />
    </>
  )
}

export default App
