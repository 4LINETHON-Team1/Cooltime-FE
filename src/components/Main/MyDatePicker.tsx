import { useState, useEffect } from 'react'
import 'react-day-picker/style.css'
import { DayPicker } from 'react-day-picker'
import { ko } from 'date-fns/locale'
import { type ThHTMLAttributes, type TableHTMLAttributes } from 'react'
import '@/index.css'
import { CustomMonthCaption } from './CustomMonthCaption'
import { CustomDayButton } from './CustomDayButton'
import { getCalendar } from '@/apis/calendar/axios'
import { useCalendarStore } from '@/store/calendarStore'

export function MyDatePicker({
  onPickDay,
  selected,
}: {
  onPickDay: (d: Date) => void
  selected: Date | null | undefined
}) {
  const postponedCount = useCalendarStore((c) => c.postponedCount)
  const completedCount = useCalendarStore((c) => c.completedCount)

  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const handleMonthChange = (month: Date) => {
    setCurrentMonth(month)
    setCurrentYear(month.getFullYear())

    const year = month.getFullYear()
    const monthNum = month.getMonth() + 1

    getCalendar({ year, month: monthNum })
    console.log('현재 달:', year, monthNum)
  }

  useEffect(() => {
    const monthNum = currentMonth.getMonth() + 1
    getCalendar({ year: currentYear, month: monthNum })
  }, [currentYear, currentMonth])

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
            <CustomMonthCaption
              {...props}
              didCount={completedCount}
              postponedCount={postponedCount}
            />
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
