import { create } from 'zustand'

const mapTypeTheme = (t) => {
  if (t === '완벽주의형') return 'blue'
  if (t == '동기저하형') return 'mint'
  return 'peach'
}

export const useUserStore = create((set) => ({
  userType: '동기저하형',
  theme: 'mint',
  setUserType: (t) => set({ userType: t, theme: mapTypeTheme(t) }),
}))

// userType: '완벽주의형',
// theme: 'blue',
// userType: '동기저하형',
// theme: 'mint',
// userType: '스트레스형',
// theme: 'peach',

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
