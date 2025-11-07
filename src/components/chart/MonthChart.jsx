import { useState } from 'react'
import PieChart from '../report/PieChart'
import Left from '@/assets/Left.svg?react'
import Right from '@/assets/Right.svg?react'
import { getCurrentDate } from '@/utils/dateUtils'

const MonthChart = () => {
  const { month } = getCurrentDate()

  const [currentMonth, setCurrentMonth] = useState(month)

  const handlePrevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth(currentMonth - 1)
    } else {
      setCurrentMonth(12)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth < 12) {
      setCurrentMonth(currentMonth + 1)
    } else {
      setCurrentMonth(1)
    }
  }

  const value = 50
  return (
    <div className='flex flex-col items-center w-full'>
      <div className='flex flex-col items-center text-center w-[350px]'>
        <div className='flex'>
          <button className='mr-2' onClick={handlePrevMonth}>
            <Left />
          </button>
          <p className='Title-01-1_1 text-black-400'>{currentMonth}월 미룸 비율</p>
          <button className='ml-2 ' onClick={handleNextMonth}>
            <Right />
          </button>
        </div>
        <p className='body-02-1_2 text-gray-900 mt-4'>저번 달보다 미룸 비율이 00% 상승했어요.</p>
      </div>
      <div className='flex flex-col items-center mt-17 w-[274px] h-[274px]'>
        <PieChart value={value} width={20} shadow={true} />
        <div className='absolute flex flex-col items-center mt-25'>
          <p className='Title-01-1_1 text-black-400'>{value}%</p>
          <p className='Title-03-3_3 text-gray-400 mt-1'>총 미룸 비율</p>
        </div>
      </div>
      <div className='flex w-[343px] h-[106px] bg-white shadow-xs rounded-2xl mt-12 items-center justify-center'>
        <div className='flex flex-col items-center mr-16'>
          <p className='body-02-1_2 text-black-400 mb-1'>했어요</p>
          <p className='Title-01-1_1 text-black-400'>30</p>
        </div>
        <div className='w-px h-[46px] bg-gray-400'></div>
        <div className='flex flex-col items-center ml-16'>
          <p className='body-02-1_2 text-black-400 mb-1'>미뤘어요</p>
          <p className='Title-01-1_1 text-black-400'>30</p>
        </div>
        <div className='flex flex-col items-center'></div>
      </div>
    </div>
  )
}

export default MonthChart
