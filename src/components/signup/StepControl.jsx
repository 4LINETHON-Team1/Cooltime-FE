import React from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'
import StepConnector from '@mui/material/StepConnector'
import DotLine from '@/assets/DotLine.svg?react'

const StepControl = ({ totalSteps, activeStep, completed }) => {
  const stepStyles = {
    active: {
      icon: {
        color: '#7A9EFF',
        fontSize: '33px',
        boxShadow: '0 1px 8px #7A9EFF',
        borderRadius: '50%',
      },
    },
    completed: {
      icon: {
        color: '#D6E1FF',
        fontSize: '33px',
        borderRadius: '50%',
      },
    },
    default: {
      icon: {
        color: 'white',
        fontSize: '33px',
        borderRadius: '50%',
        border: '1px solid #C0C0C0',
      },
    },
  }

  return (
    <div className='relative flex items-center justify-center w-full ml-5'>
      <div className='absolute inset-0 flex items-center justify-center'>
        <DotLine />
      </div>

      <Stepper
        nonLinear
        activeStep={activeStep}
        connector={
          <StepConnector
            sx={{
              '& .MuiStepConnector-line': {
                borderColor: '#C0C0C0',
                borderTopWidth: 2,
              },
            }}
          />
        }
        sx={{
          background: 'transparent',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {[...Array(totalSteps)].map((_, index) => {
          const isActive = activeStep === index
          const isCompleted = completed[index]
          const style = isActive
            ? stepStyles.active
            : isCompleted
              ? stepStyles.completed
              : stepStyles.default

          return (
            <Step key={index} completed={isCompleted}>
              <StepButton
                sx={{
                  '& .MuiStepIcon-root': style.icon,
                  '& .MuiStepIcon-root.Mui-active': stepStyles.active.icon,
                  '& .MuiStepIcon-root.Mui-completed': stepStyles.completed.icon,
                  '& .MuiStepIcon-text': {
                    fill: isActive ? 'white' : isCompleted ? 'white' : '#C0C0C0',
                    fontSize: '10px',
                  },
                }}
              />
            </Step>
          )
        })}
      </Stepper>
    </div>
  )
}

export default StepControl
