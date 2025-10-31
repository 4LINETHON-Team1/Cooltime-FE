import React, { useState, useEffect } from 'react'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { useRef } from 'react'
import ModalButton from './ModalButton'
import { useUserStore } from '@/store/store'

const RecordMirum = ({ date }) => {
  const formattedDate = date
    ? date.toLocaleDateString('ko-KR', {
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      })
    : '날짜 없음'

  const [categoryAddBtnOpen, setCategoryAddBtnOpen] = useState(false)
  const [reasonAddBtnOpen, setReasonAddBtnOpen] = useState(false)

  const handleAddCategory = () => {
    setCategoryAddBtnOpen((prev) => !prev)
  }
  const handleAddReason = () => {
    setReasonAddBtnOpen((prev) => !prev)
  }

  const perfectDefaultReasonList = ['완벽하게 하려다', '준비만 하다가', '결과가 두려워']
  const lowMotivationDefaultReasonList = ['의욕이 없어서', '자신이 없어서', '귀찮아서']
  const stressDefaultReasonList = ['머리가 복잡해서', '집중이 안 돼서', '너무 피곤해서']

  const { userType, theme } = useUserStore()
  const defaultReasonList =
    userType === '완벽주의형'
      ? perfectDefaultReasonList
      : userType === '동기저하형'
        ? lowMotivationDefaultReasonList
        : stressDefaultReasonList

  const inputRef = useRef(null)
  useEffect(() => {
    if (reasonAddBtnOpen && inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      inputRef.current.focus()
    }
  }, [reasonAddBtnOpen])

  useEffect(() => {
    if (categoryAddBtnOpen && inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      inputRef.current.focus()
    }
  }, [categoryAddBtnOpen])

  const color = {
    blue: 'border-blue-300 focus-within:border-blue-400',
    mint: 'border-mint-300 focus-within:border-mint-400',
    peach: 'border-peach-300 focus-within:border-peach-400',
  }

  const Color = color[theme] ?? null

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className='w-[343px] rounded-[20px] z-1000 bg-white h-auto fixed bottom-7 left-1/2 -translate-x-1/2'
    >
      <div className='px-[29.5px] w-full flex flex-col justify-center items-center'>
        <hr className='bg-grey-400 h-0.5 w-[119px] mt-4 flex ' />
        <div className='font-[SemiBold] text-[18px] font-thin mt-6 mb-3 text-black-400 '>
          {formattedDate}
        </div>
        <div className='flex flex-col justify-start w-full gap-8 h-[350px] overflow-y-auto scrollbar-hide'>
          <div className='mt-3'>
            <p className='body-02-1_2 text-black-400'>오늘 할 일을 했나요?</p>
            <div className='flex gap-6 mt-3 '>
              <ModalButton text='미뤘어요' />
              <ModalButton text='했어요' />
            </div>
          </div>
          <div>
            <p className='body-02-1_2 text-black-400'>무슨 일을 미뤘나요?</p>
            <div className='flex flex-wrap gap-x-6 gap-y-4 mt-3'>
              <ModalButton text='공부' />
              <ModalButton text='운동' />
              <ModalButton text='독서' />
              <ModalButton text='+' onClick={handleAddCategory} />
              {categoryAddBtnOpen && (
                <div
                  className={`flex justify-center px-4 py-2 border text-black-400 rounded-2xl w-auto ${Color}`}
                >
                  <input
                    ref={inputRef}
                    className='resize-none border-none outline-none text-[12px] w-auto'
                    placeholder='텍스트를 입력하세요...'
                  />
                </div>
              )}
            </div>
          </div>
          <div>
            <p className='body-02-1_2 text-black-400'>왜 미뤘나요?</p>
            <div className='flex flex-wrap gap-x-6 gap-y-4 mt-3'>
              {defaultReasonList.map((r, id) => (
                <ModalButton key={`${r}-${id}`} text={r} />
              ))}
              <ModalButton text='+' onClick={handleAddReason} />
              {reasonAddBtnOpen && (
                <div
                  className={`flex justify-center px-4 py-6 border mb-1 text-black-400  rounded-2xl w-[284px] ${Color}`}
                >
                  <input
                    ref={inputRef}
                    className='resize-none border-none outline-none text-[12px] w-full'
                    placeholder='자세한 이유가 있다면 적어주세요'
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <button className='mt-10 mb-4 px-10 py-2 rounded-full text-white flex justify-center items-center cursor-pointer blue:bg-blue-400 mint-bg-mint-400 peach:bg-peach-400'>
          완료
        </button>
      </div>
    </div>
  )
}

export default RecordMirum
