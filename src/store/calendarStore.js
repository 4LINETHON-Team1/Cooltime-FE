import { create } from 'zustand'

export const useDidStore = create((set) => ({
  options: ['미뤘어요', '했어요'],
  selected: new Set(),
  maxSelected: 1,
  toggleOption: (o) =>
    set((state) => {
      const next = new Set(state.selected)
      if (next.has(o)) {
        next.delete(o)
        return { selected: next }
      }
      if (o === '했어요') {
        useCategoryStore.getState().clearSelected()
        useReasonStore.getState().clearSelected()
      }
      if (state.maxSelected === 1) {
        return { selected: new Set([o]) }
      }
      next.add(o)
      return { selected: next }
    }),
  clearSelected: () => set({ selected: new Set() }),
}))

export const useCategoryStore = create((set) => ({
  categories: ['공부', '운동', '독서'],
  selected: new Set(),
  setCategories: (c) => set({ categories: c }),
  toggleCategory: (c) =>
    set((state) => {
      const next = new Set(state.selected)
      if (next.has(c)) {
        next.delete(c)
        return { selected: next }
      }
      next.add(c)
      return { selected: next }
    }),
  clearSelected: () => set({ selected: new Set() }),
}))

export const useReasonStore = create((set) => ({
  reasons: [],
  selected: new Set(),
  setReasons: (r) => set({ reasons: r }),
  toggleReason: (r) =>
    set((state) => {
      const next = new Set(state.selected)
      if (next.has(r)) {
        next.delete(r)
        return { selected: next }
      }
      next.add(r)
      return { selected: next }
    }),
  clearSelected: () => set({ selected: new Set() }),
}))

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
    date: '2025-11-04',
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

export const dummyLogDetails = {
  '2025-11-01': {
    id: 1,
    user_id: 1,
    date: '2025-11-01',
    isPostponed: true,
    note: '완벽하게 하려다 결국 못함',
    type: '완벽주의형',
    activities: [
      { id: 1, name: '과제' },
      { id: 3, name: '청소' },
    ],
    reasons: [
      { id: 1, name: '완벽하게 하려다' },
      { id: 2, name: '준비만 하다가' },
    ],
  },
  '2025-11-03': {
    id: 2,
    user_id: 1,
    date: '2025-11-03',
    isPostponed: false,
    note: '오늘은 공부함',
    type: '동기저하형',
    activities: [],
    reasons: [],
  },
  '2025-11-04': {
    id: 3,
    user_id: 1,
    date: '2025-11-04',
    isPostponed: true,
    note: '운동 미룸',
    type: '스트레스형',
    activities: [{ id: 2, name: '운동' }],
    reasons: [
      { id: 1, name: '너무 피곤해서' },
      { id: 3, name: '집중이 안 돼서' },
    ],
  },
}

export const useLogStore = create((set, get) => ({
  currentLog: null,
  type: null,
  activity: [],
  reason: [],
  setCurrentLog: (log) => set({ currentLog: log, type: log?.type ?? null }),
  setActivity: (a) => set({ activity: a }),
  setReason: (r) => set({ reason: r }),

  // 기존 선택 값 세팅
  initSelectionsFromCurrentLog: () => {
    const log = get().currentLog
    if (!log) return

    const didStore = useDidStore.getState()
    const categoryStore = useCategoryStore.getState()
    const reasonStore = useReasonStore.getState()

    // 서버에서 온 활동, 이유 추출 후 저장
    const incomingActivities = log.activities || []
    const incomingReasons = log.reasons || []

    if (incomingActivities.length > 0 && categoryStore.setCategories) {
      const merged = [
        ...categoryStore.categories,
        ...incomingActivities
          .map((a) => a.name)
          .filter((name) => !categoryStore.categories.includes(name)),
      ]
      const activityNames = incomingActivities.map((a) => a.name)
      get().setActivity(activityNames)
      categoryStore.setCategories(merged)
    }

    if (incomingReasons.length > 0) {
      const merged = [
        ...reasonStore.reasons,
        ...incomingReasons.map((r) => r.name).filter((name) => !reasonStore.reasons.includes(name)),
      ]
      const reasonNames = incomingReasons.map((a) => a.name)
      get().setReason(reasonNames)
      reasonStore.setReasons(merged)
    }

    // didStore
    didStore.clearSelected()
    didStore.toggleOption(log.isPostponed ? '미뤘어요' : '했어요')

    // categoryStore
    categoryStore.clearSelected()
    ;(log.activities || []).forEach((a) => {
      categoryStore.toggleCategory(a.name)
    })

    // reasonStore
    reasonStore.clearSelected()
    ;(log.reasons || []).forEach((r) => {
      reasonStore.toggleReason(r.name)
    })
  },
}))
