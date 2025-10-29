import { useEffect } from 'react'
import { useUserStore } from '@/store/store'

const ThemeGate = () => {
  const theme = useUserStore((s) => s.theme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('theme-blue', 'theme-mint', 'theme-peach')
    root.classList.add(`theme-${theme}`)
  }, [theme])
  return null
}

export default ThemeGate
