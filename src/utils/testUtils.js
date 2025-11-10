import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { steps } from '@/data/testData'
import { usePostTestAnswer } from '@/apis/test/queries'

export const useTestStep = () => {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()
  const [selectedAnswers, setSelectedAnswers] = useState(Array(7).fill(null))
  const { mutate } = usePostTestAnswer()

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
      mutate(selectedAnswers, {
        onSuccess: () => {
          console.log('선택 결과:', selectedAnswers)
          navigate('/result/intro')
        },
        onError: (error) => {
          console.error(error)
        },
      })
    }
  }

  const prevStep = () => {
    if (step > 0) {
      setStep((s) => s - 1)
    } else {
      navigate(-1)
    }
  }

  return {
    step,
    selectedAnswers,
    handleSelectAnswer,
    nextStep,
    prevStep,
  }
}
