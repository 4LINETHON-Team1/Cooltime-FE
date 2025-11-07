import React from 'react'
import More from '@/components/report/More'
import { useNavigate } from 'react-router-dom'

const ReportCard = ({
  title,
  children,
  align = 'start',
  width = '162px',
  height = '163px',
  more = true,
  disabled = false,
}) => {
  const navigate = useNavigate()

  const handleMore = () => {
    const routes = {
      '미룸 비율': '/report/chart',
      카테고리별: '/report/category',
      배지: '/report/badge',
      'AI 리포트': '/report/ai',
    }
    navigate(routes[title] || '/')
  }

  return (
    <div
      className={`flex flex-col items-${align} bg-white shadow-xs rounded-[12px] p-4`}
      style={{ width, height }}
    >
      <div className='flex w-full justify-between items-start'>
        <p className='body-02-1_3 text-black-400'>{title}</p>
        {more && <More disabled={disabled} onClick={handleMore} />}
      </div>
      {children}
    </div>
  )
}

export default ReportCard
