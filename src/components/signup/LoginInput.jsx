import { useState } from 'react'

const LoginInput = ({ option, state, value, onChange }) => {
  const noticeMap = {
    아이디: {
      type: 'text',
      placeholder: '아이디를 입력하세요',
      default: { label: '', style: 'body-03-1_3 text-gray-400' },
      error: { label: '해당 아이디를 찾을 수 없습니다.', style: 'body-03-1_3 text-red-400' },
    },
    비밀번호: {
      type: 'password',
      placeholder: '비밀번호를 입력하세요',
      default: {
        label: '',
        style: 'body-03-1_3 text-gray-400',
      },
      error: { label: '비밀번호가 틀렸습니다.', style: 'body-03-1_3 text-red-500' },
    },
  }

  const notice = noticeMap[option]
  const [isFocused, setIsFocused] = useState(true)
  const [hasValue, setHasValue] = useState(true)

  const handleFocus = () => setIsFocused(true)
  const handleBlur = (e) => {
    setIsFocused(false)
    setHasValue(e.target.value.trim() !== '')
  }

  const borderColor = isFocused ? 'border-main-400' : 'border-gray-400'
  const labelColor = isFocused ? 'text-main-400' : 'text-gray-400'

  return (
    <div className='mx-auto mb-8'>
      <div
        className={`w-[90vw] h-[74px] border ${borderColor} rounded-[12px] p-[16px] transition-colors duration-200`}
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
