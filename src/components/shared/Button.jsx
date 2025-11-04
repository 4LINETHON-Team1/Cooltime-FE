import React from 'react'

const Button = ({ label, onClick = () => {}, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      className={`transition-colors duration-200 w-[343px] h-[53px] text-white rounded-[100px]
        !disabled
          ? 'bg-main-400  Title-03-3_1  cursor-pointer'
          : 'bg-main-300  Title-03-3_1 cursor-pointer pointer-events-none'`}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default Button
