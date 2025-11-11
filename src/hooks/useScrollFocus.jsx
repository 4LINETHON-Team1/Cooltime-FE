import { useEffect } from 'react'

export const useScrollFocus = (isOpen, ref) => {
  useEffect(() => {
    if (isOpen && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      ref.current.focus()
    }
  }, [isOpen, ref])
}
