import { useMutation } from '@tanstack/react-query'
import { postSignOut } from './logout'
import { useNavigate } from 'react-router-dom'

export const usepostSignOut = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: () => postSignOut(),
    onSuccess: () => {
      navigate('/start')
    },
    onError: () => {
      alert('로그아웃에 실패하였습니다')
    },
  })
}
