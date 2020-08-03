import React from 'react'
import { CosinorCommand, CosinorType } from "../services/api";
import { FormDataOptions } from './settings-form';
import { getAnalysisOptionsHook, Options } from './analysis_options_hooks';
import { useStyles } from './styles';

export type SetOptions = (command: CosinorCommand, cosinorType: CosinorType, options: Partial<Options>) => void

export interface AnalysisOptionsProps {
  command: CosinorCommand
  cosinorType: CosinorType
  options: FormDataOptions
  setOptions: SetOptions,
}

export const AnalysisOptions = (props: AnalysisOptionsProps) => {

  const classes = useStyles()

  const {
    command,
    cosinorType,
    options,
    setOptions,
  } = props

  const optionInputs: JSX.Element[] = getAnalysisOptionsHook(command, cosinorType, options, setOptions)

  return (
    <div className={classes.analysisContainer}>
      Extra options:
      {optionInputs}
    </div>
  )
}