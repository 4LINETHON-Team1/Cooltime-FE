import { useUserStore } from '@/store/store'
import Perfect from '@/assets/Perfect.svg?react'
import LowMotivation from '@/assets/LowMotivation.svg?react'
import Stress from '@/assets/Stress.svg?react'
import Label from '@/components/shared/Label'
import { useNavigate } from 'react-router-dom'

const TypeResultPage = () => {
  const nickname = useUserStore((n) => n.nickname)
  const { userType } = useUserStore((s) => s)
  const navigate = useNavigate()

  const typeLabel = {
    완벽주의형: '디테일 마스터 \n 완벽주의형',
    동기저하형: '에너지 세이버 \n 동기저하형',
    스트레스형: '감정센서 \n 스트레스형',
  }
  const TypeLabel = typeLabel[userType]

  const image = {
    완벽주의형: <Perfect />,
    동기저하형: <LowMotivation />,
    스트레스형: <Stress />,
  }
  const Image = image[userType] ?? null
  const label =
    userType === '완벽주의형' ? '리노 Lino' : userType === '동기저하형' ? '모라 Mora' : '세나 Sena'

  const text1 = {
    완벽주의형:
      '세밀함과 완성도가 높아요.\n계획을 세울 때 기준이 명확해요.\n스스로의 기대치가 동기이자 부담이 되기도 해요.',
    동기저하형:
      '감정과 컨디션에 따라 에너지 흐름이 달라요.\n충분한 휴식 후 몰입력이 강하게 돌아와요.\n작은 성취에도 큰 만족을 느끼는 타입이에요.',
    스트레스형:
      '긴장 상태에서는 집중이 쉽게 흔들려요.\n긴장이 풀리면 생각이 정리돼요.\n안정된 환경에서 실력이 자연스럽게 드러나요.',
  }
  const text2 = {
    완벽주의형: `계획을 세우는 데 시간을 쓰기보다, 작은 단위 기록부터 시작해보세요. '완벽히 채운 하루'보다 '기록이 이어진 흐름'에 집중하면 꾸준함이 더 쉬워져요.`,
    동기저하형: `처음부터 큰 목표를 세우기보단, 가벼운 미션으로 워밍업해보세요. 하루에 한 가지라도 기록하면 '성취감 루프'가 생겨요.`,
    스트레스형: `복잡한 일정 대신 하루 한 번 루틴 체크로 부담을 낮춰 드릴게요. '쉬어도 괜찮은 이유'를 함께 찾아봐요.`,
  }

  const Text1 = text1[userType]
  const Text2 = text2[userType]

  return (
    <div className='flex min-h-screen justify-center items-center w-full scrollbar-hide'>
      <div
        className='w-full max-w-[440px] min-h-screen flex flex-col items-center gap-6
      blue:bg-[linear-gradient(180deg,var(--color-blue-400)_9.3%,var(--color-blue-100)_66.75%)]
      mint:bg-[linear-gradient(180deg,var(--color-mint-400)_9.3%,var(--color-mint-200)_66.75%)]
      peach:bg-[linear-gradient(180deg,var(--color-peach-400)_9.3%,var(--color-peach-200)_66.75%)]
      '
      >
        <div>
          <p className='mt-20 text-[18px] blue:text-[#5A5D73] mint:text-[#4E655E] peach:text-peach-700'>
            {nickname}님의 미룸 성향은
          </p>
          <p className='text-black-400 text-[32px] leading-tight font-[SemiBold] text-center whitespace-pre-line'>
            {TypeLabel}
          </p>
        </div>
        {Image}
        <div className='bg-white rounded-t-4xl shadow-s px-10 py-8 w-full grow flex flex-col gap-6'>
          <div className='flex w-full justify-center'>
            <Label label={label} />
          </div>
          <div className='text-black-400 text-[14px] font-[Medium] whitespace-pre-wrap leading-loose'>
            {Text1}
          </div>
          <div className='text-grey-400 text-[14px] break-keep'>
            <span className='text-red text-[12px]'>쿨타임에서 이렇게 해보세요!</span>
            <br />
            {Text2}
          </div>
          <button
            onClick={() => navigate('/main')}
            className='rounded-full w-[343px] h-[53px] text-[18px] font-[SemiBold] text-white cursor-pointer blue:bg-blue-500 mint:bg-mint-500 peach:bg-peach-500'
          >
            시작하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default TypeResultPage
