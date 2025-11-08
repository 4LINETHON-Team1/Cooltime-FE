import { create } from 'zustand'
import { userTypeMap } from '@/utils/userTypeMap'

const mapTypeTheme = (t) => {
  if (t === '완벽주의형') return 'blue'
  if (t == '동기저하형') return 'mint'
  return 'peach'
}

export const useUserStore = create((set) => ({
  userType: '완벽주의형',
  theme: 'blue',
  nickname: '아기사자',
  setUserType: (t) => {
    const koreanType = userTypeMap[t]
    set({ userType: koreanType, theme: mapTypeTheme(koreanType) })
  },
  setNickname: (n) => set({ nickname: n }),
}))

// userType: '완벽주의형',
// theme: 'blue',
// userType: '동기저하형',
// theme: 'mint',
// userType: '스트레스형',
// theme: 'peach',
