import React from 'react'
import More from '@/components/report/More'

const ReportCard = ({
  title,
  children,
  align = 'start',
  width = '162px',
  height = '163px',
  more = true,
  disabled = false,
}) => {
  return (
    <div
      className={`flex flex-col items-${align} bg-white shadow-xs rounded-[12px] p-4`}
      style={{ width, height }}
    >
      <div className='flex w-full justify-between items-start'>
        <p className='body-02-1_3 text-black-400'>{title}</p>
        {more && <More disabled={disabled} />}
      </div>
      {children}
    </div>
  )
}

export default ReportCard
