import TestBgImg from '@/assets/TestBgImg.svg?react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/shared/Button'
import ProgressBar from '@/components/test/ProgressBar'
import AnswerBtn from '@/components/test/AnswerBtn'

const TestPage = () => {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()

  const steps = [
    {
      question: '해야 할 일을 앞두면 \n 제일 먼저 드는 생각은?',
      answer: {
        1: '기준부터 세워야지. 대충은 싫어!',
        2: '솔직히 의욕이 아직 안 생겼는데...',
        3: '하루 스케쥴이 이미 꽉 찼는데 언제 하지?',
      },
    },
    {
      question: '미루고 나서 가장 \n 크게 느끼는 감정은?',
      answer: {
        1: '왜 또 이렇게 완벽하게 하려다 못 했지?',
        2: '딱히 죄책감은 없고 그냥 피곤해...',
        3: '몸이랑 머리가 다 지쳐서 더 하기 싫어',
      },
    },
    {
      question: '계획을 세울 때 나는...',
      answer: {
        1: '계획표를 만들어야 마음이 놓여',
        2: '계획을 세우면 오히려 부담돼서 안 세워',
        3: '세우긴 하는데 현실적으로 너무 많아 늘 밀려',
      },
    },
    {
      question: '집중하려고 할 때 \n 내 패턴은?',
      answer: {
        1: '시작하기까지 오래 걸리지만, 시작하면 오래 감',
        2: '흥미가 없으면 금방 집중이 끊김',
        3: '집중하려 해도 피로 때문에 오래 못 감',
      },
    },
    {
      question: '내가 자주 미루는 \n 이유를 꼽자면?',
      answer: { 1: '완벽히 해내고 싶어서', 2: '흥미가 없어서', 3: '너무 지쳐 있어서' },
    },
    {
      question: '일을 끝냈을 때 가장 \n 만족스러울 때는?',
      answer: {
        1: '계획대로 완벽하게 마무리됐을 때',
        2: '생각보다 금방 끝나서 뿌듯할 때',
        3: '일정을 무사히 소화하고 푹 쉴 때',
      },
    },
    {
      question: '미룸을 줄이기 위한 \n 가장 효과적인 방법은?',
      answer: {
        1: `'일단 시작하고 수정한다'는 마인드 갖기`,
        2: '재밌는 동기나 보상을 먼저 만드는 것',
        3: '휴식 시간을 확보해서 피로를 줄이는 것',
      },
    },
  ]

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
      navigate('/')
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
    navigate('/')
  }

  return (
    <div className='flex min-h-screen justify-center items-center w-full scrollbar-hide'>
      <div className='w-full flex flex-col items-center max-w-[430px] min-h-screen bg-[linear-gradient(180deg,#fff_30.79%,#F2F5FF_100%)]'>
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
