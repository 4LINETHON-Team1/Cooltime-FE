import React from 'react'
import StartMix from '@/assets/StartMix.svg'
import Button from '@/components/shared/Button'

const StartPage = () => {
  return (
    <div className='flex flex-col min-h-screen justify-start items-center w-full max-w-[490px] mx-auto bg-linear-to-b from-main-300 via-white to-white'>
      <div className='flex flex-col justify-baseline items-start text-left w-full h-full ml-10 mt-[76px]'>
        <div className='mb-8'>
          <h1 className='Title-01-1_1 mb-[-5px]'>미루는 나도,</h1>
          <span className='Title-01-1_1 text-[#2862FF]'>꾸준히 기록하는 나</span>
          <span className='Title-01-1_1 '>로 </span>
        </div>
        <div className='mb-15'>
          <h3 className='body-01-1_2 text-grey-900'>오늘의 미룸도 괜찮아요.</h3>
          <h3 className='body-01-1_2 text-grey-900'>내일의 나를 위한 쿨타임이니까요.</h3>
        </div>
      </div>
      <img
        src={StartMix}
        alt='icon'
        className='fixed mt-15 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full'
      />
      <div className='fixed bottom-10 justify-center items-center text-center'>
        <Button label='처음 시작해요' />
        <h3 className='mt-[13px] body-01-1_2 text-gray-400'>이미 계정이 있습니다</h3>
      </div>
    </div>
  )
}

export default StartPage
