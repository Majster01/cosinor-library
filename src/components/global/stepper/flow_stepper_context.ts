import React from 'react'

export type FlowStepperState = {
  stepNavigationBack?(): void
  stepNavigationNext?(): void
}

export const FlowStepperContext = React.createContext<FlowStepperState>({})

export function useFlowStepperContext () {
  const context = React.useContext(FlowStepperContext)

  return context
}
