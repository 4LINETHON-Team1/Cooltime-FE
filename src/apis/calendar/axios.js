import apiClient from '../login/axiosConfig'
import { useCalendarStore } from '@/store/calendarStore'
import { useDidStore, useCategoryStore, useReasonStore, useLogStore } from '@/store/calendarStore'
import { useUserStore } from '@/store/store'
import { userTypeMap } from '@/utils/userTypeMap'

export const getCalendar = async ({ year, month }) => {
  const { setLogs, setCompletedCount, setPostponedCount } = useCalendarStore.getState()
  const { data } = await apiClient.get(`/api/calendar?year=${year}&month=${month}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  })
  console.log(data.data)
  const summary = data.data.summary
  const logs = data.data.logs
  setLogs(logs)
  setCompletedCount(summary.completedCount)
  setPostponedCount(summary.postponedCount)

  return data
}

export const postLog = async () => {
  const { isPostponed } = useDidStore.getState()
  const { userType } = useUserStore.getState()
  const selectedCategories = Array.from(useCategoryStore.getState().selected)
  const selectedReasons = Array.from(useReasonStore.getState().selected)

  const typeMap = {
    완벽주의형: 'PERFECTION',
    동기저하형: 'MOTIVATION',
    스트레스형: 'STRESS',
  }

  const payload = {
    isPostponed: isPostponed,
    myType: typeMap[userType],
    activities: selectedCategories,
    reasons: selectedReasons,
  }
  console.log(payload)

  try {
    const { data } = await apiClient.post('/api/log', payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
    return data
  } catch (error) {
    console.log(error.response?.data)
    throw error
  }
}

export const getLog = async (dateString) => {
  const { data } = await apiClient.get(`/api/log?date=${dateString}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
  console.log(data)
  const res = data.data
  // 서버 응답을 스토어가 먹을 수 있는 모양으로 변환
  const normalized = {
    ...res,
    type: userTypeMap[res.myType] ?? null,
    activities: (res.activities || []).map((name, idx) => ({ id: idx, name })),
    reasons: (res.reasons || []).map((name, idx) => ({ id: idx, name })),
  }

  const { setCurrentLog, initSelectionsFromCurrentLog } = useLogStore.getState()
  setCurrentLog(normalized)
  // 이거 하면 did/category/reason 스토어들도 서버 데이터로 선택 상태 맞춰짐
  initSelectionsFromCurrentLog()

  return normalized
}
