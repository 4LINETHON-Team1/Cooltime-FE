import Back from '../../assets/Back.svg'
import { useNavigate } from 'react-router-dom'

const Header = ({ label }) => {
  const navigate = useNavigate()
  return (
    <div className='fixed top-0 z-50 text-[#364153] bg-white flex items-center w-full max-w-[440px] h-[54px] shadow-xs left-1/2 -translate-x-1/2'>
      <img
        src={Back}
        alt='return'
        onClick={() => navigate(-1)}
        className='absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer'
      />
      <p className='mx-auto body-01-1_2'>{label}</p>
    </div>
  )
}

export default Header
