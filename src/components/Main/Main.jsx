import React from 'react'
import Label from '../shared/Label'
import { useUserStore } from '@/store/store'
import Perfect from '@/assets/Perfect.svg?react'
import LowMotivation from '@/assets/LowMotivation.svg?react'
import Stress from '@/assets/Stress.svg?react'
import Calendar from './Calendar'

const Main = () => {
  const { userType, theme } = useUserStore()

  const text1 = {
    완벽주의형: '완벽보다 나은 건, 지금의 시작이야',
    동기저하형: '동하기 싫은 날, 억지로 안 해도 돼',
    스트레스형: '괜찮아, 잠시 쉬어도 세상은 그대로야',
  }
  const text2 = {
    완벽주의형: `오늘은 '완성'보다 '시작'을 선택해보자`,
    동기저하형: `'다시 시작할 수 있는 나'를 잊지 말자`,
    스트레스형: '지금은 잠깐 내려놓아도 돼',
  }
  const image = {
    완벽주의형: <Perfect />,
    동기저하형: <LowMotivation />,
    스트레스형: <Stress />,
  }
  const color = {
    blue: 'bg-blue-100 bg-opacity-50 border-blue-400 text-blue-600',
    mint: 'bg-mint-100 bg-opacity-50 border-mint-400 text-mint-600',
    peach: 'bg-peach-100 bg-opacity-50 border-peach-400 border-opacity-50 text-peach-600',
  }

  const Text1 = text1[userType] ?? '유형 없음'
  const Text2 = text2[userType] ?? '유형 없음'
  const Image = image[userType] ?? null

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='w-full flex justify-start'>
        <Label />
      </div>
      <div className='flex flex-col justify-center items-center mt-[3.94vh]'>
        <div className='text-black-400 Title-03-3_2'>{Text1}</div>
        <div className='text-black-400 body-02-1_3'>{Text2}</div>
        <div className='mt-[1.97vh]'>{Image}</div>
      </div>
      <Calendar />
    </div>
  )
}

export default Main
