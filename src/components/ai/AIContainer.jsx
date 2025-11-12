import React from 'react'

const AIContainer = ({ Header, color, text = '' }) => {
  let commentColor = 'text-black-400'
  let displayText = text

  if (Header.includes('저번 주') && text === '') {
    displayText = '아직 저번 주 데이터가 충분하지 않아요.'
    commentColor = 'text-black-300'
  } else if (text === '') {
    displayText = '아직 데이터가 충분하지 않아요.'
    commentColor = 'text-black-300'
  }

  return (
    <div className='mb-8'>
      <p className={`body-01-1_1 ${color.text} mb-4`}>{Header}</p>
      <div
        className={`flex flex-col justify-center p-4 w-[343px] ${color.border} bg-white shadow-xs rounded-2xl min-h-[50px]`}
      >
        <p className={`body-02-1_3 ${commentColor}`}>{displayText}</p>
      </div>
    </div>
  )
}

export default AIContainer
