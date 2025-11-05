import { useState } from 'react'
import Left from '@/assets/Left.svg?react'
import Right from '@/assets/Right.svg?react'
import { getCurrentDate } from '@/utils/dateUtils'
import BarChart from './BarChart'

const data = [
  { month: '1월', value: 40 },
  { month: '2월', value: 60 },
  { month: '3월', value: 80 },
  { month: '4월', value: 55 },
  { month: '5월', value: 75 },
  { month: '6월', value: 30 },
  { month: '7월', value: 65 },
  { month: '8월', value: 20 },
  { month: '9월', value: 35 },
  { month: '10월', value: 25 },
  { month: '11월', value: 45 },
  { month: '12월', value: 55 },
]

const YearChart = () => {
  const { year } = getCurrentDate()

  const [currentYear, setCurrentYear] = useState(year)

  const handlePrevYear = () => {
    setCurrentYear(currentYear - 1)
  }

  const handleNextYear = () => {
    if (year > currentYear) {
      setCurrentYear(currentYear + 1)
    }
  }

  const value = 50
  return (
    <div className='flex flex-col items-center w-full'>
      <div className='flex flex-col items-center text-center w-[350px]'>
        <div className='flex'>
          <button className='mr-2' onClick={handlePrevYear}>
            <Left />
          </button>
          <p className='Title-01-1_1 text-black-400'>{currentYear}년 미룸 비율</p>
          <button className='ml-2 ' onClick={handleNextYear}>
            <Right />
          </button>
        </div>
        <p className='body-02-1_2 text-gray-900 mt-4'>저번 년보다 미룸 비율이 00% 상승했어요.</p>
      </div>
      <div className='fixed bottom-50'>
        <BarChart data={data} />
      </div>
    </div>
  )
}

export default YearChart
