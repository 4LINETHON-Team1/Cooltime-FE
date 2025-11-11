import Label from '../shared/Label'
import { useUserStore } from '@/store/store'
import { MyDatePicker } from './MyDatePicker'
import { typeImage } from '@/data/typeImage'
import { text1, text2 } from '@/data/calendarData'

const Main = ({ onPickDay, pickedDay }) => {
  const { userType } = useUserStore()

  const type =
    userType === '완벽주의형' ? '완벽주의' : userType === '동기저하형' ? '동기저하' : '스트레스'
  const Text1 = text1[userType] ?? '유형 없음'
  const Text2 = text2[userType] ?? '유형 없음'
  const Image = typeImage[userType] ?? null

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='w-full flex justify-start'>
        <Label label={type} />
      </div>
      <div className='flex flex-col justify-center items-center mt-[3.94vh]'>
        <div className='text-black-400 Title-03-3_2'>{Text1}</div>
        <div className='text-black-400 body-02-1_3'>{Text2}</div>
        <div className='mt-[1.97vh]'>{Image}</div>
      </div>
      <div className='pt-2'>
        <MyDatePicker onPickDay={onPickDay} selected={pickedDay} />
      </div>
    </div>
  )
}

export default Main
