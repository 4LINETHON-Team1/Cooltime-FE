import { PieChart as Chart } from 'react-minimal-pie-chart'
import { useUserStore } from '@/store/store'

const PieChart = ({ value, width }) => {
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
