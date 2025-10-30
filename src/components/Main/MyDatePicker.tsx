import { useState } from 'react'
import 'react-day-picker/style.css'
import { useDayPicker } from 'react-day-picker'
import { DayPicker, DayProps } from 'react-day-picker'
import { ko } from 'date-fns/locale'

export function MyDatePicker() {
  const [selected, setSelected] = useState<Date>()

  return (
    <DayPicker
      locale={ko}
      weekStartsOn={1}
      mode='single'
      selected={selected}
      onSelect={setSelected}
      footer={selected ? `Selected: ${selected.toLocaleDateString()}` : null}
      navLayout='around'
    />
  )
}
