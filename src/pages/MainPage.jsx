import ThemeGate from '@/hooks/ThemeGate'
import React from 'react'
import Main from '@/components/Main/Main'

const MainPage = () => {
  return (
    <div className='flex min-h-screen justify-center items-center w-full'>
      <div
        className='w-full max-w-[430px] min-h-screen
      blue:bg-[linear-gradient(180deg,var(--color-blue-300)_15.09%,var(--color-blue-100)_83%)]
      mint:bg-[linear-gradient(180deg,var(--color-mint-300)_15.09%,var(--color-mint-100)_83%)]
      peach:bg-[linear-gradient(180deg,var(--color-peach-300)_15.09%,var(--color-peach-100)_83%)]
      '
      >
        <div className='px-4 pt-[17px] pb-10'>
          <Main />
        </div>
      </div>
    </div>
  )
}

export default MainPage
