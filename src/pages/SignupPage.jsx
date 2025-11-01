import { useState } from 'react'
import StepControl from '@/components/signup/StepControl'
import Button from '@/components/shared/Button'
import Back from '@/assets/Back.svg?react'
import Input from '@/components/signup/Input'

const SignupPage = () => {
  const totalSteps = 3
  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState({})
  const [disabled, isDisabled] = useState(false)

  const option = [
    { step: 0, label: '아이디' },
    { step: 1, label: '비밀번호' },
    { step: 2, label: '닉네임' },
  ]

  const handleComplete = () => {
    setCompleted((prev) => ({ ...prev, [activeStep]: true }))
    if (activeStep < totalSteps - 1) {
      setActiveStep((prev) => prev + 1)
    }
  }

  return (
    <div>
      <div className='mt-10 ml-4'>
        <Back />
      </div>
      <div className='mt-10 ml-2 w-[131px]'>
        <StepControl activeStep={activeStep} totalSteps={totalSteps} completed={completed} />
      </div>
      <div className='mt-9 ml-4'>
        <h3 className='Title-01-1_2 text-main-500'>{option[activeStep].label} 입력</h3>
      </div>
      <div className='mt-8 flex flex-col items-center'>
        <Input option={option[activeStep].label} />
        {activeStep === 1 && <Input option='비밀번호_확인' />}
      </div>
      <div className='fixed bottom-10 left-1/2 -translate-x-1/2 text-center'>
        <Button label='다음' onClick={handleComplete} disabled={disabled}></Button>
      </div>
    </div>
  )
}

export default SignupPage
