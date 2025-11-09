import TestBgImg from '@/assets/TestBgImg.svg?react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/shared/Button'
import ProgressBar from '@/components/test/ProgressBar'
import AnswerBtn from '@/components/test/AnswerBtn'
import { steps } from '@/data/testData'

const TestPage = () => {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()

  const [selectedAnswers, setSelectedAnswers] = useState(Array(7).fill(null))
  const currentStep = steps[step]

  const handleSelectAnswer = (answerId) => {
    setSelectedAnswers((prev) => {
      const next = [...prev]
      next[step] = Number(answerId)
      return next
    })
  }

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1)
    } else {
      console.log('선택 결과:', selectedAnswers)
      navigate('/result/intro')
    }
  }

  const prevStep = () => {
    if (step > 0) {
      setStep((s) => s - 1)
    } else {
      navigate(-1)
    }
  }

  const goToResult = () => {
    console.log('선택 결과:', selectedAnswers)
    navigate('/result/intro')
  }

  return (
    <div className='flex min-h-screen justify-center items-center w-full scrollbar-hide'>
      <div className='w-full flex flex-col items-center max-w-[440px] min-h-screen bg-[linear-gradient(180deg,#fff_30.79%,#F2F5FF_100%)]'>
        <ProgressBar step={step} totalSteps={steps.length} onBack={prevStep} />
        <div className='relative mt-[12.53vh] w-[235px] h-[62px] flex justify-center items-center'>
          <p
            className='whitespace-pre-line w-full pt-5 text-center text-[26px] font-[SemiBold] font-light text-black-400'
            dangerouslySetInnerHTML={{ __html: currentStep.question }}
          />
          <div className='absolute -right-[25px] -top-[7px] pointer-events-none z-10'>
            <TestBgImg />
          </div>
        </div>
        <div className='flex flex-col gap-8 mt-[10vh]'>
          {Object.entries(currentStep.answer).map(([key, value]) => (
            <div key={key}>
              <AnswerBtn
                text={value}
                selected={selectedAnswers[step] === Number(key)}
                onClick={() => handleSelectAnswer(key)}
              />
            </div>
          ))}
        </div>
        <div className='absolute bottom-10'>
          <Button
            disabled={selectedAnswers[step] == null}
            label={step < 7 ? '다음' : '완료'}
            onClick={() => (step < steps.length - 1 ? nextStep() : goToResult())}
          />
        </div>
      </div>
    </div>
  )
}

export default TestPage
