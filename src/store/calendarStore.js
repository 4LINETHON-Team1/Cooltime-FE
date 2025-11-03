import { create } from 'zustand'

// 더미 데이터
const dummyLogs = [
  {
    id: 1,
    user_id: 1,
    date: '2025-11-01',
    isPostponed: true,
    note: null,
    type: 'Perfectionist',
  },
  {
    id: 2,
    user_id: 1,
    date: '2025-11-03',
    isPostponed: false,
    note: '공부 미룸',
    type: 'Low-Motivation',
  },
  {
    id: 3,
    user_id: 1,
    date: '2025-11-07',
    isPostponed: true,
    note: '운동 못함',
    type: 'Stress-Prone',
  },
  {
    id: 3,
    user_id: 1,
    date: '2025-10-10',
    isPostponed: true,
    note: '운동 못함',
    type: 'Stress-Prone',
  },
]

export const useCalendarStore = create((set) => ({
  currentMonth: new Date(),
  selectedDate: null,
  logs: dummyLogs,
  setCurrentMonth: (month) => set({ currentMonth: month }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setLogs: (logs) => set({ logs }),
}))
