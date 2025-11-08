import { useState, useEffect } from 'react'
import StepControl from '@/components/signup/StepControl'
import Button from '@/components/shared/Button'
import Back from '@/assets/Back.svg?react'
import LoginInput from '@/components/signup/LoginInput'
import { useNavigate } from 'react-router-dom'
import { signup } from '@/apis/signup/signup'

export const baseURL = import.meta.env.VITE_API_BASE_URL

const SignupPage = () => {
  const totalSteps = 3
  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState({})
  const [disabled, setDisabled] = useState(true)
  const [state, setState] = useState('default')
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  })

  const navigate = useNavigate()

  const option = [
    { step: 0, key: 'id', label: '아이디' },
    { step: 1, key: 'password', label: '비밀번호' },
    { step: 2, key: 'nickname', label: '닉네임' },
  ]

  const currentKey = option[activeStep].key
  const currentValue = formData[currentKey]

  const handleChange = (e) => {
    const { value } = e.target
    setFormData((prev) => ({
      ...prev,
      [currentKey]: value,
    }))
  }

  useEffect(() => {
    setState('default')
    setDisabled(currentValue.trim().length === 0)
  }, [currentValue])

  useEffect(() => {
    setState('default')
    setDisabled(true)
  }, [activeStep])

  const handleCheck = () => {
    if (activeStep === 0) {
      if (formData.id.length < 4) {
        setState('error')
        setDisabled(true)
        return false
      }
    } else if (activeStep === 1) {
      if (formData.password.length < 6) {
        setState('error')
        setDisabled(true)
        return false
      }
      if (formData.password !== formData.confirmPassword) {
        setState('error')
        setDisabled(true)
        return false
      }
    } else if (activeStep === 2) {
      if (formData.nickname.trim().length < 2) {
        setState('error')
        setDisabled(true)
        return false
      }
    }
    return true
  }

  const handleComplete = () => {
    if (handleCheck()) {
      setCompleted((prev) => ({ ...prev, [activeStep]: true }))
      if (activeStep < totalSteps - 1) {
        setActiveStep((prev) => prev + 1)
      } else {
        console.log(formData)
        signup(formData)
        navigate('/login')
      }
    }
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
          value={currentValue}
          onChange={handleChange}
          step={activeStep}
        />

        {activeStep === 1 && (
          <LoginInput
            option='비밀번호_확인'
            state={state}
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
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
