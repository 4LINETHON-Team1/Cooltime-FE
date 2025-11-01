import React from 'react'

const Input = ({ option }) => {
  const noticeMap = {
    아이디: {
      placeholder: '아이디를 입력하세요',
      default: { label: '4-12자리 영문,숫자로 입력해주세요.', style: 'body-03-1_3 text-gray-400' },
      duplicate: { label: '이미 사용 중인 아이디입니다', style: 'body-03-1_3 text-red-400' },
      invalid: { label: '영문/숫자만 입력 가능합니다', style: 'body-03-1_3 text-red-400' },
    },
    비밀번호: {
      placeholder: '비밀번호를 입력하세요',
      default: {
        label: '8-20자, 영문·숫자·특수문자 2종 이상 조합해주세요.',
        style: 'body-03-1_3 text-gray-400',
      },
      invalid: { label: '비밀번호 조건을 확인해주세요', style: 'body-03-1_3 text-red-500' },
    },
    닉네임: {
      placeholder: '쿨타임에서 사용할 닉네임을 입력해주세요',
      default: { label: '한글 12자 이내로 입력해주세요.', style: 'body-03-1_3 text-gray-400' },
      duplicate: { label: '중복된 닉네임입니다', style: 'body-03-1_3 text-red-400' },
    },
    비밀번호_확인: {
      placeholder: '비밀번호를 재입력해주세요',
      default: { label: '비밀번호를 다시 입력해주세요', style: 'body-03-1_3 text-gray-400' },
      duplicate: { label: '비밀번호가 일치하지 않습니다', style: 'body-03-1_3 text-red-500' },
    },
  }
  const notice = noticeMap[option]
  return (
    <div className='mx-auto mb-8'>
      <div className='w-[343px] h-[74px] border border-main-400 rounded-[12px] p-[16px]'>
        <p className='body-02-1_2 text-main-400'>{option}</p>
        <input
          className='body-02-1_3 placeholder:text-gray-400 text-black w-full focus:outline-none focus:border-none'
          placeholder={`${notice.placeholder}`}
        ></input>
      </div>
      <div className='ml-2 mt-1'>
        <p className={`${notice.default.style}`}>{notice.default.label}</p>
      </div>
    </div>
  )
}

export default Input
