import React from 'react'
import { useUserStore } from '@/store/store'

const Label = () => {
  const { userType, theme } = useUserStore()

  const label = {
    완벽주의형: '완벽주의',
    동기저하형: '동기저하',
    스트레스형: '스트레스',
  }
  const color = {
    blue: 'bg-blue-100 bg-opacity-50 border-blue-400 text-blue-600',
    mint: 'bg-mint-100 bg-opacity-50 border-mint-400 text-mint-600',
    peach: 'bg-peach-100 bg-opacity-50 border-peach-400 border-opacity-50 text-peach-600',
  }

  const labelText = label[userType] ?? '유형 없음'
  const labelColor = color[theme] ?? null
  return (
    <div
      className={`inline-flex px-4 py-2 text-[14px] justify-center items-center border border-solid rounded-full ${labelColor}`}
    >
      {labelText}
    </div>
  )
}

export default Label
