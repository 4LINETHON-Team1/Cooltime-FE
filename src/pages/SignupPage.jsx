import { useState, useEffect } from 'react'
import StepControl from '@/components/signup/StepControl'
import Button from '@/components/shared/Button'
import Back from '@/assets/Back.svg?react'
import SignupInput from '@/components/signup/SignupInput'
import LoginInput from '@/components/signup/LoginInput'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
  const totalSteps = 3
  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState({})
  const [disabled, setDisabled] = useState(true)
  const [state, setState] = useState('default')
  const [value, setValue] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const option = [
    { step: 0, label: '아이디' },
    { step: 1, label: '비밀번호' },
    { step: 2, label: '닉네임' },
  ]

  useEffect(() => {
    setState('default')
    setDisabled(value.length === 0)
  }, [value])

  useEffect(() => {
    setValue('')
    setPassword('')
    setState('default')
    setDisabled(true)
  }, [activeStep])

  const handleComplete = () => {
    if (handleCheck()) {
      setCompleted((prev) => ({ ...prev, [activeStep]: true }))
      if (activeStep < totalSteps - 1) {
        setActiveStep((prev) => prev + 1)
      } else {
        navigate('/login')
      }
    } else {
    }
  }

  const handleCheck = () => {
    if (activeStep == 0) {
      if (value.length < 10) {
        setState('error')
        setDisabled(true)
        return false
      }
    }
    return true
  }

  return (
    <div>
      <div className='mt-10 ml-4'>
        <button onClick={() => navigate(-1)}>
          <Back />
        </button>
      </div>
      <div className='mt-9 ml-2 w-[131px]'>
        <StepControl activeStep={activeStep} totalSteps={totalSteps} completed={completed} />
      </div>
      <div className='mt-9 ml-5'>
        <h3 className='Title-01-1_2 text-main-500'>{option[activeStep].label} 입력</h3>
      </div>
      <div className='mt-8 flex flex-col items-center'>
        <LoginInput
          option={option[activeStep].label}
          state={state}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          step={activeStep}
        />
        {activeStep === 1 && (
          <LoginInput
            option='비밀번호_확인'
            state={state}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            step={activeStep}
          />
        )}
      </div>
      <div className='fixed bottom-10 left-1/2 -translate-x-1/2 text-center'>
        <Button label='다음' onClick={handleComplete} disabled={disabled}></Button>
      </div>
    </div>
  )
}

export default SignupPage
