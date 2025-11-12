import { useMutation } from '@tanstack/react-query'
import { postLog, updateLog, postActivity, postReason, deleteActivity, deleteReason } from './axios'
import {
  useDidStore,
  useCategoryStore,
  useReasonStore,
  useCalendarStore,
} from '@/store/calendarStore'
import { getCalendar, getTag } from '@/apis/calendar/axios'

export const usePostLog = (closeModal) => {
  const clearDid = useDidStore((s) => s.clearSelected)
  const clearCategory = useCategoryStore((s) => s.clearSelected)
  const clearReason = useReasonStore((s) => s.clearSelected)
  const currentMonth = useCalendarStore((s) => s.currentMonth)

  return useMutation({
    mutationFn: () => postLog(),
    onSuccess: async () => {
      closeModal?.()

      const year = currentMonth.getFullYear()
      const monthNum = currentMonth.getMonth() + 1
      await getCalendar({ year, month: monthNum })

      clearDid()
      clearCategory()
      clearReason()
    },
    onError: (err) => {
      console.error('미룸 기록 저장 실패', err)
      alert('기록 저장에 실패했어요. 다시 시도해주세요.')
    },
  })
}

export const useUpdateLog = (onSuccess) => {
  const clearDid = useDidStore((s) => s.clearSelected)
  const clearCategory = useCategoryStore((s) => s.clearSelected)
  const clearReason = useReasonStore((s) => s.clearSelected)
  const currentMonth = useCalendarStore((s) => s.currentMonth)

  return useMutation({
    mutationFn: () => updateLog(),
    onSuccess: async () => {
      onSuccess?.()

      const year = currentMonth.getFullYear()
      const monthNum = currentMonth.getMonth() + 1
      await getCalendar({ year, month: monthNum })

      clearDid()
      clearCategory()
      clearReason()
    },
    onError: (err) => {
      console.error('미룸 기록 저장 실패', err)
      alert('기록 수정에 실패했어요. 다시 시도해주세요.')
    },
  })
}

export const usePostActivity = () => {
  return useMutation({
    mutationFn: (name) => postActivity({ name }),
    onSuccess: async (res) => {
      console.log('활동 추가 성공' + res)
      await getTag()
    },
    onError: (err) => {
      console.error('활동 추가 실패', err)
      alert('활동 추가에 실패했어요. 다시 시도해주세요.')
    },
  })
}

export const useDeleteActivity = () => {
  return useMutation({
    mutationFn: (name) => deleteActivity({ name }),
    onSuccess: async (res) => {
      console.log('활동 삭제 성공' + res)
      await getTag()
    },
    onError: (err) => {
      console.error('활동 삭제 실패', err)
      alert('활동 삭제에 실패했어요. 다시 시도해주세요.')
    },
  })
}

export const usePostReason = () => {
  return useMutation({
    mutationFn: (name) => postReason({ name }),
    onSuccess: async (res) => {
      console.log('이유 추가 성공' + res)
      await getTag()
    },
    onError: (err) => {
      console.error('이유 추가 실패', err)
      alert('이유 추가에 실패했어요. 다시 시도해주세요.')
    },
  })
}

export const useDeleteReason = () => {
  return useMutation({
    mutationFn: (name) => deleteReason({ name }),
    onSuccess: async (res) => {
      console.log('이유 삭제 성공' + res)
      await getTag()
    },
    onError: (err) => {
      console.error('이유 삭제 실패', err)
      alert('이유 삭제에 실패했어요. 다시 시도해주세요.')
    },
  })
}
