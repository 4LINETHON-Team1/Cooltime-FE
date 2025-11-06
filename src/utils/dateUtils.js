export const getCurrentDate = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.getDate()

  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
  const firstDayWeekday = firstDay.getDay()
  const weekNumber = Math.ceil((date + firstDayWeekday) / 7)

  const weekNames = ['첫째주', '둘째주', '셋째주', '넷째주', '다섯째주']
  const weekName = weekNames[weekNumber - 1] || '다섯째주'

  return {
    year,
    month,
    week: weekName,
  }
}
