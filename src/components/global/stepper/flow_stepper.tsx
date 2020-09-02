import React, { useState } from 'react'
import { Stepper, Step, StepLabel } from '@material-ui/core'
import { DataSelection } from '../../data_selection/data_selection'
import { AnalysisSelection } from '../../analysis_selection/analysis_selection'
import { useStyles } from './styles'
import { FlowStepperContext } from './flow_stepper_context'
import { ResultDisplay } from '../../result_display/result_display'

export interface FlowStep {
  label: string,
  component: React.FC
}

interface FlowStepMap {
  [key: number]: FlowStep
}

const flowStepMapConfig: FlowStep[] = [{
    label: 'Select data for analysis',
    component: DataSelection,
  },
  {
    label: 'Select analysis and options',
    component: AnalysisSelection,
  },
]

export const FlowStepper: React.FC = () => {

  const classes = useStyles()

  const [activeStep, setActiveStep] = useState<number>(0)

  const canGoBack: boolean = activeStep > 0
  const canContinue: boolean = activeStep < 2

  const stepNavigationNext = () => {
    if (canContinue) {
      setActiveStep((prevStep: number) => prevStep + 1)
    }
  }

  const stepNavigationBack = () => {
    if (canGoBack) {
      setActiveStep((prevStep: number) => prevStep - 1)
    }
  }

  const canGoToStep = (step: number) => step <= activeStep

  const goToStep = (step: number) => {
    if (canGoToStep(step)) {
      setActiveStep(step)
    }
  }

  const ActiveComponent: React.FC = flowStepMapConfig[activeStep].component

  return (
    <div className={classes.container}>
      <Stepper className={classes.stepper} activeStep={activeStep}>
        {flowStepMapConfig.map((step: FlowStep, i: number) => {

          const label = step.label

          const className: string | undefined = canGoToStep(i) ? classes.stepperHover : undefined

          return (
            <Step key={label} className={className} style={{}} onClick={() => goToStep(i)}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div className={classes.content}>
        <FlowStepperContext.Provider value={{ stepNavigationNext, stepNavigationBack }}>
          <ActiveComponent />
          { activeStep === 1 && <ResultDisplay /> }
        </FlowStepperContext.Provider>
      </div>
    </div>
  )
}