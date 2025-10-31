import ThemeGate from '@/hooks/ThemeGate'
import React, { useState, useEffect } from 'react'
import Main from '@/components/Main/Main'
import Footer from '@/components/shared/Footer'
import RecordMirum from '@/components/Main/RecordMirum'

const MainPage = () => {
  const [open, setOpen] = useState(false)
  const [pickedDay, setPickedDay] = useState(null)

  useEffect(() => {
    if (open) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }

    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [open])

  const handleCloseAndResetSelection = () => {
    setOpen(false)
    setPickedDay(null)
  }

  const handlePickDay = (day) => {
    if (open && pickedDay && pickedDay.toDateString() === day.toDateString()) {
      handleCloseAndResetSelection()
    } else {
      setPickedDay(day)
      setOpen(true)
    }
  }

  return (
    <div className='flex min-h-screen justify-center items-center w-full scrollbar-hide'>
      <div
        className='w-full max-w-[430px] min-h-screen
      blue:bg-[linear-gradient(180deg,var(--color-blue-300)_15.09%,var(--color-blue-100)_83%)]
      mint:bg-[linear-gradient(180deg,var(--color-mint-300)_15.09%,var(--color-mint-100)_83%)]
      peach:bg-[linear-gradient(180deg,var(--color-peach-300)_15.09%,var(--color-peach-100)_83%)]
      '
      >
        <div className='px-4 pt-[17px] pb-20'>
          <Main onPickDay={handlePickDay} pickedDay={pickedDay} />
        </div>
        <Footer selectedMenu='home' />
      </div>
      {open && (
        <div className='fixed inset-0 z-50 w-full max-w-[430px] mx-auto'>
          <div
            className='absolute inset-0 w-full max-w-[430px] bg-grey-400/30 flex justify-center items-center'
            onClick={handleCloseAndResetSelection}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <RecordMirum date={pickedDay} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MainPage
