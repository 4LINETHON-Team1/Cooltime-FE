import './App.css'
import { Outlet } from 'react-router-dom'
import ThemeGate from './hooks/ThemeGate'

function App() {
  return (
    <>
      <ThemeGate />
      <Outlet />
    </>
  )
}

export default App
