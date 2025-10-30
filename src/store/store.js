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
