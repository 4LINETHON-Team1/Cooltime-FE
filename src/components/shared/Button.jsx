import React from 'react'

const Button = ({ label, onClick = () => {}, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      className={
        !disabled
          ? 'bg-main-400 w-[343px] h-[53px] text-white Title-03-3_1 rounded-[100px] cursor-pointer'
          : 'bg-main-300 w-[343px] h-[53px] text-white Title-03-3_1 rounded-[100px] cursor-pointer pointer-events-none'
      }
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default Button
