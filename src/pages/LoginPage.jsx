import { useState, useEffect } from 'react'
import Button from '@/components/shared/Button'
import Back from '@/assets/Back.svg?react'
import LoginInput from '@/components/signup/LoginInput'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [disabled, setDisabled] = useState(false)
  const [idNotice, setIdNotice] = useState('none')
  const [passNotice, setPassNotice] = useState('none')
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    if (id.trim() !== '' && password.trim() !== '') {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [id, password])

  const handleWelcome = () => {
    navigate('/welcome')
  }

  return (
    <div>
      <div className='mt-10 ml-4'>
        <Back />
      </div>
      <div className='mt-9 ml-5'>
        <h3 className='Title-01-1_2 text-main-500'>로그인을 해주세요.</h3>
      </div>
      <div className='mt-8 flex flex-col items-center'>
        <LoginInput
          option='아이디'
          state={idNotice}
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <LoginInput
          option='비밀번호'
          state={passNotice}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='fixed bottom-10 left-1/2 -translate-x-1/2 text-center'>
        <Button label='다음' onClick={handleWelcome} disabled={disabled}></Button>
      </div>
    </div>
  )
}

export default LoginPage
