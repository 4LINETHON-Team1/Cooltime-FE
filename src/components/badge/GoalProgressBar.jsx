import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const GoalProgressBar = ({ maxDay, day, color, fill }) => {
  const percent = (day / maxDay) * 100

  const data = [
    {
      name: 'Progress',
      value: percent,
    },
  ]

  return (
    <div className='w-full text-center'>
      <ResponsiveContainer width='100%' height={10}>
        <BarChart data={data} layout='vertical' margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id='progressGradient' x1='0' y1='0' x2='1' y2='0'>
              <stop offset='0%' stopColor={color?.from || '#B4B9E6'} />
              <stop offset='100%' stopColor={color?.to || '#8190FF'} />
            </linearGradient>
          </defs>

          <XAxis type='number' domain={[0, 100]} hide />
          <YAxis type='category' dataKey='name' hide />

          <Bar dataKey='value' fill='url(#progressGradient)' background={{ fill }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GoalProgressBar
