import { useState } from 'react'
import { getCurrentDate } from '@/utils/dateUtils'

export const useWeekNavigation = () => {
  const { month: nowMonth, week: nowWeek } = getCurrentDate()
  const weekNames = ['첫째주', '둘째주', '셋째주', '넷째주', '다섯째주']

  const initialWeekIndex = weekNames.indexOf(nowWeek)
  const [currentWeek, setCurrentWeek] = useState(initialWeekIndex)
  const [currentMonth, setCurrentMonth] = useState(nowMonth)

  const handlePrevWeek = () => {
    if (currentWeek > 0) {
      setCurrentWeek(currentWeek - 1)
    } else {
      setCurrentMonth((prev) => (prev === 1 ? 12 : prev - 1))
      setCurrentWeek(4)
    }
  }

  const handleNextWeek = () => {
    const isFutureMonth = currentMonth > nowMonth
    const isFutureWeek = currentMonth === nowMonth && currentWeek >= weekNames.indexOf(nowWeek)

    if (isFutureMonth || isFutureWeek) return
    if (currentWeek < 4) {
      setCurrentWeek(currentWeek + 1)
    } else {
      setCurrentMonth((prev) => (prev === 12 ? 1 : prev + 1))
      setCurrentWeek(0)
    }
  }

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 1 ? 12 : prev - 1))
    setCurrentWeek((prev) => Math.max(0, Math.min(prev, 4)))
  }

  const handleNextMonth = () => {
    const isFuture = currentMonth >= nowMonth
    if (isFuture) return

    setCurrentMonth((prev) => (prev === 12 ? 1 : prev + 1))
    setCurrentWeek((prev) => Math.max(0, Math.min(prev, 4)))
  }

  const isNextDisabled =
    currentMonth > nowMonth ||
    (currentMonth === nowMonth && currentWeek >= weekNames.indexOf(nowWeek))

  return {
    weekNames,
    currentWeek,
    currentMonth,
    handlePrevWeek,
    handleNextWeek,
    handlePrevMonth,
    handleNextMonth,
    isNextDisabled,
  }
}
