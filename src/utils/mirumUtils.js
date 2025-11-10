import { useEffect } from 'react'
import { useUserStore } from '@/store/store'
import { useReasonStore } from '@/store/calendarStore'
import {
  perfectDefaultReasonList,
  lowMotivationDefaultReasonList,
  stressDefaultReasonList,
} from '@/data/calendarData'

export const useDefaultReasons = () => {
  const { userType } = useUserStore()
  const { setReasons } = useReasonStore()
  useEffect(() => {
    const list =
      userType === '완벽주의형'
        ? perfectDefaultReasonList
        : userType === '동기저하형'
          ? lowMotivationDefaultReasonList
          : stressDefaultReasonList

    setReasons(list)
  }, [userType, setReasons])
}
