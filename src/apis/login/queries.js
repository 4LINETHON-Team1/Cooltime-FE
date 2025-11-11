import { useMutation } from '@tanstack/react-query'
import { postSignOut } from './logout'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store/store'

export const usepostSignOut = () => {
  const navigate = useNavigate()
  const resetUser = useUserStore((s) => s.resetUser)
  return useMutation({
    mutationFn: () => postSignOut(),
    onSuccess: () => {
      resetUser()
      navigate('/start')
    },
    onError: () => {
      alert('로그아웃에 실패하였습니다')
    },
  })
}
