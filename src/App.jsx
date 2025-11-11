import './App.css'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import ThemeGate from './hooks/ThemeGate'

function App() {
  const hasToken = !!localStorage.getItem('accessToken')
  const location = useLocation()

  const publicPaths = ['/', '/login', '/signup']

  if (!hasToken && !publicPaths.includes(location.pathname)) {
    return <Navigate to='/' replace />
  }

  return (
    <>
      <ThemeGate />
      <Outlet />
    </>
  )
}

export default App
