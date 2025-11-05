import React from 'react'
import My from '@/assets/My.svg?react'
import Report from '@/assets/Report.svg?react'
import Home from '@/assets/Home.svg?react'
import { Link } from 'react-router-dom'

const Footer = ({ selectedMenu = '' }) => {
  return (
    <div className='fixed bottom-0 z-50 bg-white flex items-center justify-between w-full max-w-[440px] px-10 py-3 left-1/2 transform -translate-x-1/2 rounded-t-[20px] shadow-[0_-1px_10px_-1px_rgba(0,0,0,0.1)]'>
      <Link to={'/main'}>
        <Home className={selectedMenu === 'home' ? 'text-black-400' : 'text-grey-400'} />
      </Link>
      <Link to={'/report'}>
        <Report className={selectedMenu === 'report' ? 'text-black-400' : 'text-grey-400'} />
      </Link>
      <Link to={'/mypage'}>
        <My className={selectedMenu === 'mypage' ? 'text-black-400' : 'text-grey-400'} />
      </Link>
    </div>
  )
}

export default Footer
