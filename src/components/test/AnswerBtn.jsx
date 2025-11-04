import React from 'react'

const AnswerBtn = ({ selected = false, text, onClick = () => {} }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`w-[343px] h-[65px] text-[14px] rounded-2xl text-black-400 border ${selected ? 'border-main-500 font-[Medium] bg-[rgba(242,245,255,0.80)] shadow-[0_1px_8px_0_rgba(110,142,230,0.50)]' : 'border-grey-300 shadow-xs'} cursor-pointer`}
      >
        {text}
      </button>
    </div>
  )
}

export default AnswerBtn
