import React from 'react'
import { useGetOptionsHook } from './analysis_selection_hooks'
import { CosinorCommand, CosinorType } from '../../services/api'
import { GeneralOptions } from './options/general_options'

export const AnalysisSelection: React.FC = () => {

  const options: JSX.Element | null = useGetOptionsHook()

  console.log('options', options)

  return (
    <div>
      <div>AnalysisSelection</div>
      <div>
        <GeneralOptions />
      </div>
      <div>
        {options}
      </div>
    </div>
  )
}