import { useState, useMemo } from 'react'
import 'react-day-picker/style.css'
import { DayPicker, useDayPicker, type CalendarMonth } from 'react-day-picker'
import { ko } from 'date-fns/locale'
import React, { type ThHTMLAttributes, type TableHTMLAttributes } from 'react'
import PerfectCalendar from '@/assets/PerfectCalender.svg?react'
import StressCalendar from '@/assets/StressCalendar.svg?react'
import LowMotivationCalendar from '@/assets/LowMotivationCalendar.svg?react'
import CalendarCheck2 from '@/assets/CalendarCheck2.svg?react'
import CalendarLeftArrow from '@/assets/CalendarLeftArrow.svg?react'
import CalendarRightArrow from '@/assets/CalendarRightArrow.svg?react'
import CalendarCheck from '@/assets/CalendarCheck.svg?react'
import { useUserStore } from '@/store/store'
import '@/index.css'
import PerfectDid from '@/assets/PerfectDid.svg?react'
import PerfectPostponed from '@/assets/PerfectPostponed.svg?react'
import StressDid from '@/assets/StressDid.svg?react'
import StressPostponed from '@/assets/StressPostponed.svg?react'
import LowMotivationDid from '@/assets/LowMotivationDid.svg?react'
import LowMotivationPostponed from '@/assets/LowMotivationPostponed.svg?react'
import type { DayButtonProps } from 'react-day-picker'

type MonthCaptionProps = React.ComponentProps<'div'> & {
  calendarMonth: CalendarMonth
  displayIndex: number
  didCount?: number
  postponedCount?: number
  nothing?: null
}

function CustomMonthCaption({
  calendarMonth,
  displayIndex,
  didCount,
  postponedCount,
  nothing,
  ...rest
}: MonthCaptionProps) {
  const { goToMonth } = useDayPicker()

  const image = {
    완벽주의형: <PerfectCalendar />,
    동기저하형: <LowMotivationCalendar />,
    스트레스형: <StressCalendar />,
  }
  const check = {
    완벽주의형: <CalendarCheck />,
    동기저하형: <CalendarCheck2 />,
    스트레스형: <CalendarCheck2 />,
  }
  const { userType } = useUserStore()
  const Image = image[userType] ?? null
  const Check = check[userType] ?? null

  return (
    <div {...rest} className={`flex flex-col items-center justify-center gap-2 mb-3 mt-1`}>
      <div className='flex items-center gap-1 px-4 pb-5'>
        <button
          className='cursor-pointer'
          onClick={() =>
            goToMonth(new Date(calendarMonth.date.getFullYear(), calendarMonth.date.getMonth() - 1))
          }
        >
          <CalendarLeftArrow />
        </button>
        <span className='font-semibold text-black-400'>
          {calendarMonth.date.toLocaleString('ko-KR', { year: 'numeric', month: 'long' })}
        </span>
        <button
          className='cursor-pointer'
          onClick={() =>
            goToMonth(new Date(calendarMonth.date.getFullYear(), calendarMonth.date.getMonth() + 1))
          }
        >
          <CalendarRightArrow />
        </button>
      </div>

      <div className='flex h-5 items-center w-full justify-start gap-2'>
        <div className='flex items-center justify-center gap-2'>
          {Image}
          <div className='text-black-400 text-[14px]'>{didCount}</div>
        </div>
        <div className='flex items-center justify-center gap-2'>
          {Check}
          <div className='text-black-400 text-[14px]'>{postponedCount}</div>
        </div>
      </div>
    </div>
  )
}

// date 매핑
function toISO(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

// 더미 데이터
const dummyLogs = [
  {
    id: 1,
    user_id: 1,
    date: '2025-11-01',
    isPostponed: true,
    note: null,
    type: 'Perfectionist',
  },
  {
    id: 2,
    user_id: 1,
    date: '2025-11-03',
    isPostponed: false,
    note: '공부 미룸',
    type: 'Low-Motivation',
  },
  {
    id: 3,
    user_id: 1,
    date: '2025-11-07',
    isPostponed: true,
    note: '운동 못함',
    type: 'Stress-Prone',
  },
  {
    id: 3,
    user_id: 1,
    date: '2025-10-10',
    isPostponed: true,
    note: '운동 못함',
    type: 'Stress-Prone',
  },
]

// 한 날 아이콘
const DidIcon: Record<'blue' | 'mint' | 'peach', React.FC<any>> = {
  blue: PerfectDid,
  mint: LowMotivationDid,
  peach: StressDid,
} as const

// 미룬날 아이콘
const PostponedIcon: Record<'blue' | 'mint' | 'peach', React.FC<any>> = {
  blue: PerfectPostponed,
  mint: LowMotivationPostponed,
  peach: StressPostponed,
} as const

function CustomDayButton(props: DayButtonProps) {
  const theme = useUserStore((s) => s.theme)

  const logsByDate = useMemo(() => {
    const m: Record<string, { status: 'postponed' | 'did'; theme: string }> = {}
    for (const l of dummyLogs) {
      m[l.date] = { status: l.isPostponed ? 'postponed' : 'did', theme }
    }
    return m
  }, [dummyLogs, theme])

  const { day, modifiers, className, ...buttonProps } = props
  const key = toISO(day.date)
  const info = logsByDate[key]
  const label = String(day.date.getDate())

  const today = new Date()
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const startOfDay = new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate())

  const isPast = startOfDay.getTime() < startOfToday.getTime()
  const isToday = startOfDay.getTime() === startOfToday.getTime()

  let content: React.ReactNode = (
    <span
      className={`${isPast ? 'text-grey-400' : isToday ? 'blue:text-blue-600 peach:text-peach-600 mint:text-mint-600 ' : 'text-black-400'}`}
    >
      {label}
    </span>
  )
  if (info) {
    const Icon = info.status === 'postponed' ? PostponedIcon[info.theme] : DidIcon[info.theme]
    content = (
      <span className='inline-flex h-[33px] w-[38px] items-center justify-center'>
        <Icon />
      </span>
    )
  }

  return (
    <button
      {...buttonProps}
      className={`rdp-day-btn inline-flex items-center justify-center ${className ?? ''}`}
      aria-label={info ? `${key} ${info.status}` : buttonProps['aria-label']}
    >
      {content}
    </button>
  )
}

export function MyDatePicker({
  onPickDay,
  selected,
}: {
  onPickDay: (d: Date) => void
  selected: Date | null | undefined
}) {
  const didCount = 3
  const postponedCount = 5
  const [currentMonth, setCurrentMonth] = useState(new Date()) // 현재 보고 있는 달

  const handleMonthChange = (month: Date) => {
    setCurrentMonth(month)
    const year = month.getFullYear()
    const monthNum = month.getMonth() + 1
    console.log('현재 달:', year, monthNum)
  }

  function CustomChevron() {
    return null
  }
  function CustomWeekDay(props: ThHTMLAttributes<HTMLTableCellElement>) {
    return <th {...props} className='text-[12px] text-black-400 pb-1 font-light' />
  }
  function CustomMonthGrid(props: TableHTMLAttributes<HTMLTableElement>) {
    return <table {...props} className='border-separate border-spacing-y-3' />
  }

  return (
    <div>
      <DayPicker
        locale={ko}
        weekStartsOn={1}
        mode='single'
        onMonthChange={handleMonthChange}
        selected={selected}
        onSelect={(day) => {
          onPickDay(day)
        }}
        footer={selected ? `Selected: ${selected.toLocaleDateString()}` : null}
        navLayout='around'
        components={{
          MonthCaption: (props) => (
            <CustomMonthCaption {...props} didCount={didCount} postponedCount={postponedCount} />
          ),
          Chevron: CustomChevron,
          Weekday: CustomWeekDay,
          MonthGrid: CustomMonthGrid,
          DayButton: CustomDayButton,
        }}
      />
    </div>
  )
}
