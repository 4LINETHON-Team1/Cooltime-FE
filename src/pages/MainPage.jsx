import { useState, useEffect } from 'react'
import Main from '@/components/Main/Main'
import Footer from '@/components/shared/Footer'
import RecordMirum from '@/components/Main/RecordMirum'
import { dummyLogDetails } from '@/store/calendarStore'
import ShowRecordModal from '@/components/Main/ShowRecordModal'
import UpdateRecordModal from '@/components/Main/UpdateRecordModal'
import { toISO } from '@/components/Main/CustomDayButton'
import ConfirmModal from '@/components/Main/ConfirmModal'
import {
  useCalendarStore,
  useDidStore,
  useCategoryStore,
  useReasonStore,
  useLogStore,
} from '@/store/calendarStore'

const MainPage = () => {
  const [open, setOpen] = useState(false)
  const [pickedDay, setPickedDay] = useState(null)
  const [modalMode, setModalMode] = useState('create')
  const [showSuccess, setShowSuccess] = useState(false)

  const monthLogs = useCalendarStore((s) => s.logs)

  const setCurrentLog = useLogStore((s) => s.setCurrentLog)
  const initSelectionsFromCurrentLog = useLogStore((s) => s.initSelectionsFromCurrentLog)

  const clearDid = useDidStore((s) => s.clearSelected)
  const clearCategory = useCategoryStore((s) => s.clearSelected)
  const clearReason = useReasonStore((s) => s.clearSelected)

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
    clearDid()
    clearCategory()
    clearReason()
  }

  const handleShowEditModal = (date) => {
    setModalMode('edit')
    setOpen(true)
    setPickedDay(date)
  }

  const handlePickDay = (day) => {
    if (!day) return

    const iso = toISO(day)
    const dayLog = monthLogs.find((log) => log.date === iso)

    if (open && pickedDay && pickedDay.toDateString() === day.toDateString()) {
      handleCloseAndResetSelection()
      return
    }
    if (!dayLog) {
      clearDid()
      clearCategory()
      clearReason()
      setCurrentLog(null)
      setModalMode('create')
      setPickedDay(day)
      setOpen(true)
      return
    } else {
      const detail = dummyLogDetails[iso]
      if (detail) {
        setCurrentLog(detail)
        initSelectionsFromCurrentLog()
        setModalMode('show')
      } else {
        setModalMode('create')
      }
      setPickedDay(day)
      setOpen(true)
    }
  }

  return (
    <div className='flex min-h-screen justify-center items-center w-full scrollbar-hide'>
      <div
        className='w-full max-w-[440px] min-h-screen
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
        <div className='fixed inset-0 z-50 w-full max-w-[440px] mx-auto'>
          <div
            className='absolute inset-0 w-full max-w-[440px] bg-grey-400/30 flex justify-center items-center'
            onClick={handleCloseAndResetSelection}
          >
            <div onClick={(e) => e.stopPropagation()}>
              {modalMode === 'create' ? (
                <RecordMirum date={pickedDay} />
              ) : modalMode === 'show' ? (
                <ShowRecordModal
                  onClick={() => {
                    setOpen(false)
                    setPickedDay(null)
                  }}
                  date={pickedDay}
                  onEdit={handleShowEditModal}
                />
              ) : (
                <UpdateRecordModal
                  date={pickedDay}
                  onSuccess={() => {
                    handleCloseAndResetSelection()
                    setShowSuccess(true)
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
      {showSuccess && (
        <div className='fixed inset-0 z-50 w-full max-w-[440px] mx-auto'>
          <div
            className='absolute inset-0 w-full max-w-[440px] bg-grey-400/30 flex justify-center items-center'
            onClick={handleCloseAndResetSelection}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <ConfirmModal onClose={() => setShowSuccess(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MainPage
