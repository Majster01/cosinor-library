import React from 'react'
import { useGetOptionsHook } from './analysis_selection_hooks'
import { GeneralOptions } from './options/general_options'
import { useStyles } from './styles'

export const AnalysisSelection: React.FC = () => {

  const options: JSX.Element | null = useGetOptionsHook()

  const classes = useStyles()

  console.log('options', options)

  return (
    <div className={classes.container}>
      <div>
        <GeneralOptions />
      </div>
      <div>
        {options}
      </div>
    </div>
  )
}