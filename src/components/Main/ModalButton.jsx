import React from 'react'
import { useState } from 'react'
import { useUserStore } from '@/store/store'

const ModalButton = ({ text, selected = false, onClick = () => {} }) => {
  const { theme } = useUserStore()

  const color = {
    blue: `${selected ? 'text-white bg-[linear-gradient(180deg,var(--color-blue-400)_0%,var(--color-blue-500)_100%)] border-blue-400' : 'text-grey-400 border-blue-300'} hover:border-blue-400`,
    mint: `${selected ? 'text-white bg-[linear-gradient(180deg,var(--color-mint-400)_0%,var(--color-mint-500)_100%)] border-mint-400' : 'text-grey-400 border-mint-300'} hover:border-mint-400`,
    peach: `${selected ? 'text-white bg-[linear-gradient(180deg,var(--color-peach-400)_0%,var(--color-peach-500)_100%)] border-peach-400' : 'text-grey-400 border-peach-300 hover:border-peach-400'}`,
  }

  const labelColor = color[theme] ?? null

  return (
    <div>
      <button
        onClick={onClick}
        className={`inline-flex text-[14px] px-3.5 py-1.5 rounded-3xl border transition-colors duration-200 cursor-pointer ${labelColor}`}
      >
        {text}
      </button>
    </div>
  )
}

export default ModalButton
