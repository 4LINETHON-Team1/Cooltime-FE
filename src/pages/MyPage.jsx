import Perfect from '@/assets/Perfect.svg?react'
import LowMotivation from '@/assets/LowMotivation.svg?react'
import Stress from '@/assets/Stress.svg?react'
import Label from '@/components/shared/Label'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store/store'
import Footer from '@/components/shared/Footer'
import RightArrow from '@/assets/RightArrow.svg?react'

const MyPage = () => {
  const { userType } = useUserStore((s) => s)
  const navigate = useNavigate()
  const nickname = useUserStore((n) => n.nickname)

  const image = {
    완벽주의형: <Perfect />,
    동기저하형: <LowMotivation />,
    스트레스형: <Stress />,
  }
  const Image = image[userType] ?? null

  const label =
    userType === '완벽주의형' ? '완벽주의' : userType === '동기저하형' ? '동기저하' : '스트레스'

  return (
    <div className='flex min-h-screen justify-center items-center w-full scrollbar-hide'>
      <div className='w-full flex flex-col items-center max-w-[440px] min-h-screen blue:bg-blue-100 mint:bg-mint-100 peach:bg-peach-100'>
        <div className='mt-20'>{Image}</div>
        <div className='flex flex-col justify-center items-center gap-[19px] mt-6'>
          <p className='font-[Medium] text-[22px] text-black-400'>{nickname}</p>
          <Label label={label} />
        </div>
        <div className='flex flex-col gap-6 mt-20'>
          <button
            onClick={() => navigate('/test')}
            className='w-[343px] text-black-400 text-[14px] font-[Medium] py-4 px-4 flex items-center justify-between bg-white border rounded-2xl cursor-pointer blue:border-blue-500 mint:border-mint-500 peach:border-peach-500'
          >
            유형 재검사하기
            <RightArrow />
          </button>
          <button className='w-[343px] text-black-400 text-[14px] font-[Medium] py-4 px-4 flex items-center justify-between bg-white border rounded-2xl cursor-pointer blue:border-blue-500 mint:border-mint-500 peach:border-peach-500'>
            로그아웃
            <RightArrow />
          </button>
        </div>

        <Footer selectedMenu='mypage' />
      </div>
    </div>
  )
}

export default MyPage
