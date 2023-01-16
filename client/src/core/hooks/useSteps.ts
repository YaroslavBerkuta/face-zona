import { useState } from "react"



export const useSteps = (steps: string[], initialIndex: number) => {

  const [step, setStep] = useState(initialIndex)

  const nextStep = () => {
    setStep(step + 1)
  }

  const backStep = () => {
    setStep(step - 1)
  }

  return {
    step: steps[step],
    nextStep,
    backStep
  }
}