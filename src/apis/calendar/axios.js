import apiClient from '../login/axiosConfig'
import { useCalendarStore } from '@/store/calendarStore'

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
