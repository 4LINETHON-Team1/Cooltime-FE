import React from 'react'
import { noticeData } from '@/data/noticeData'

const SignupInput = ({ option, state }) => {
  const notice = noticeData[option]
  return (
    <div className='mx-auto mb-8'>
      <div className='w-[90vw] h-[74px] border border-main-400 rounded-[12px] p-[16px]'>
        <p className='body-02-1_2 text-main-400'>{option}</p>
        <input
          type={notice.type}
          className='body-02-1_3 placeholder:text-gray-400 text-black w-full focus:outline-none focus:border-none'
          placeholder={`${notice.placeholder}`}
        ></input>
      </div>
      <div className='ml-2 mt-1 h-4'>
        <p className={`${notice[state].style}`}>{notice[state].label}</p>
      </div>
    </div>
  )
}

export default SignupInput
