import { useMutation } from '@tanstack/react-query'
import { postTestAnswer } from './test'
import { useUserStore } from '@/store/store'

export const usePostTestAnswer = () => {
  const setUserType = useUserStore((s) => s.setUserType)
  return useMutation({
    /** @param {any[]} answers */
    mutationFn: (answers) => postTestAnswer(answers),
    onSuccess: (res) => {
      const mytype = res?.data?.mytype
      if (mytype) {
        setUserType(mytype)
      }
    },
  })
}
