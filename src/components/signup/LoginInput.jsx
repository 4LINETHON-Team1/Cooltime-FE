import { useState, useEffect } from 'react'
import { noticeData } from '@/data/noticeData'

const LoginInput = ({ option, state, value, onChange, step = 0 }) => {
  const notice = noticeData[option]
  const [isFocused, setIsFocused] = useState(true)

  const handleFocus = () => setIsFocused(true)
  const handleBlur = (e) => setIsFocused(false)

  useEffect(() => {
    setIsFocused(true)
  }, [step])

  const borderColor = isFocused ? 'border-main-400' : 'border-gray-400'
  const labelColor = isFocused ? 'text-main-400' : 'text-gray-400'

  return (
    <div className='mx-auto mb-8'>
      <div
        className={`w-[343px] h-[74px] border ${borderColor} rounded-[12px] p-[16px] transition-colors duration-200`}
      >
        <p className={`body-02-1_2 ${labelColor}`}>{option}</p>
        <input
          type={notice.type}
          value={value}
          onChange={onChange}
          className='body-02-1_3 placeholder:text-gray-400 text-black w-full focus:outline-none focus:border-none'
          placeholder={`${notice.placeholder}`}
          onFocus={handleFocus}
          onBlur={handleBlur}
        ></input>
      </div>
      <div className='ml-2 mt-1 h-3'>
        <p className={`${notice[state].style}`}>{notice[state].label}</p>
      </div>
    </div>
  )
}

export default LoginInput
