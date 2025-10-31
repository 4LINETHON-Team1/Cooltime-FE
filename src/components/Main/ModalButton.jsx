import React from 'react'
import { useState } from 'react'

const ModalButton = ({ text, onClick = () => {} }) => {
  const [selected, setSelected] = useState(false)

  const handleClick = () => {
    setSelected((prev) => !prev)
    onClick()
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className={`text-[14px] px-3.5 py-1.5 rounded-3xl border transition-colors duration-200 cursor-pointer hover:border-main-400 ${selected ? 'text-white bg-[linear-gradient(180deg,var(--color-main-400)_0%,#4D7BFB_100%)]' : 'text-grey-400 border-main-300'}`}
      >
        {text}
      </button>
    </div>
  )
}

export default ModalButton
