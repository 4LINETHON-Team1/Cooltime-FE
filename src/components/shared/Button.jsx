import React from 'react'

const Button = ({ label, onClick = () => {}, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      className={
        !disabled
          ? 'bg-main-400 w-[343px] h-[53px] text-white Title-03-3_1 rounded-[100px]'
          : 'bg-main-300 w-[343px] h-[53px] text-white Title-03-3_1 rounded-[100px]'
      }
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default Button
