import React from 'react'
import { CosinorCommand } from "../services/api";
import { FormDataOptions } from './settings-form';
import { getAnalysisOptionsHook, Options } from './analysis_options_hooks';
import { useStyles } from './styles';

export type SetOptions = (command: CosinorCommand, options: Partial<Options>) => void

export interface AnalysisOptionsProps {
  command: CosinorCommand
  options: FormDataOptions
  setOptions: SetOptions,
}

export const AnalysisOptions = (props: AnalysisOptionsProps) => {

  const classes = useStyles()

  const {
    command,
    options,
    setOptions,
  } = props

  const optionInputs: JSX.Element[] = getAnalysisOptionsHook(command, options, setOptions)

  return (
    <div className={classes.analysisContainer}>
      Extra options:
      {optionInputs}
    </div>
  )
}