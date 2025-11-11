import { create } from 'zustand'

export const useDidStore = create((set) => ({
  options: ['미뤘어요', '했어요'],
  selected: new Set(),
  isPostponed: true,
  maxSelected: 1,
  toggleOption: (o) =>
    set((state) => {
      const next = new Set(state.selected)
      if (next.has(o)) {
        next.delete(o)
        return { selected: next, isPostponed: true }
      }
      if (o === '했어요') {
        useCategoryStore.getState().clearSelected()
        useReasonStore.getState().clearSelected()
      }
      if (state.maxSelected === 1) {
        return { selected: new Set([o]), isPostponed: o === '미뤘어요' }
      }
      next.add(o)
    }),
  clearSelected: () => set({ selected: new Set(), isPostponed: true }),
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
      const didStore = useDidStore.getState()
      if (didStore.selected.size === 0) {
        didStore.toggleOption('미뤘어요')
      }
      return { selected: next }
    }),
  addCategory: (newC) =>
    set((state) => {
      if (!newC?.trim()) return state
      if (state.categories.includes(newC)) return state

      const updated = [...state.categories, newC]

      const didStore = useDidStore.getState()
      if (didStore.selected.size === 0) {
        didStore.toggleOption('미뤘어요')
      }

      return { categories: updated }
    }),
  removeCategory: (c) =>
    set((state) => ({
      categories: state.categories.filter((x) => x !== c),
      selected: (() => {
        const next = new Set(state.selected)
        next.delete(c)
        return next
      })(),
    })),
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
      const didStore = useDidStore.getState()
      if (didStore.selected.size === 0) {
        didStore.toggleOption('미뤘어요')
      }
      return { selected: next }
    }),
  addReason: (newR) =>
    set((state) => {
      if (!newR?.trim()) return state
      if (state.reasons.includes(newR)) return state

      const updated = [...state.reasons, newR]

      const didStore = useDidStore.getState()
      if (didStore.selected.size === 0) {
        didStore.toggleOption('미뤘어요')
      }
      return { reasons: updated }
    }),
  removeReason: (r) =>
    set((state) => ({
      reasons: state.reasons.filter((x) => x !== r),
      selected: (() => {
        const next = new Set(state.selected)
        next.delete(r)
        return next
      })(),
    })),
  clearSelected: () => set({ selected: new Set() }),
}))

export const useCalendarStore = create((set) => ({
  currentMonth: new Date(),
  selectedDate: null,
  completedCount: 0,
  postponedCount: 0,
  logs: [],
  setCurrentMonth: (month) => set({ currentMonth: month }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setLogs: (logs) => set({ logs }),
  setCompletedCount: (count) => set({ completedCount: count }),
  setPostponedCount: (count) => set({ postponedCount: count }),
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
  '2025-11-05': {
    id: 3,
    user_id: 1,
    date: '2025-11-05',
    isPostponed: true,
    note: '운동 미룸',
    type: '스트레스형',
    activities: [
      { id: 2, name: '운동' },
      { id: 1, name: '과제' },
      { id: 3, name: '청소' },
    ],
    reasons: [
      { id: 1, name: '너무 피곤해서' },
      { id: 3, name: '집중이 안 돼서' },
      { id: 4, name: '쿨쿨슨' },
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
