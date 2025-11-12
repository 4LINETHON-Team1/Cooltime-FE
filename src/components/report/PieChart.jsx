import { PieChart as Chart } from 'react-minimal-pie-chart'
import { useUserStore } from '@/store/store'

const PieChart = ({ value, width, shadow = false }) => {
  const { theme } = useUserStore()

  const color = {
    blue: '#C8CEFF',
    mint: '#AEE1D1',
    peach: '#FFD6B3',
  }
  const chartColor = color[theme] ?? '#C8CEFF'

  return (
    <Chart
      data={[
        {
          value: 100,
          color: chartColor,
          name: 'name1',
        },
      ]}
      style={shadow ? { filter: 'drop-shadow(0 1px 8px rgba(0, 0, 0, 0.15))' } : undefined}
      reveal={value}
      lineWidth={width}
      background='#F0F0F0'
      lengthAngle={360}
      rounded
      animate
      startAngle={-90}
    />
  )
}

export default PieChart
