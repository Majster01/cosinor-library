import React from 'react'
import { AnalysisOptionsProps, SetOptions } from "./analysis_options"
import { CosinorCommand } from '../services/api'
import { FormDataOptions } from './settings-form'
import { Checkbox, TextField, MenuItem, FormLabel, FormControlLabel } from '@material-ui/core'

export enum PeriodogramPeriodType {
  PER = 'per',
  WELCH = 'welch'
}

export interface PeriodogramOptions {
  periodType: PeriodogramPeriodType,
  logScale: boolean,
  prominent: boolean,
  maxPeriod: number,
}


export interface FitGroupOptions {
  components: number,
  period: number,
}

enum MultipleOptionInputKeys {
  periodType = 'periodType'
}

enum NumberOptionInputKeys {
  components = 'components'
}

const getNumberInputLimits = (key: string) => {
  if (key === NumberOptionInputKeys.components) {
    return {
      max: 3,
      min: 1,
    }
  }

  return {}
}

const getMenuItemLabel = (key: MultipleOptionInputKeys, value: any): string => {
  if (key === MultipleOptionInputKeys.periodType && value === PeriodogramPeriodType.PER) {
    return 'Period'
  }

  if (key === MultipleOptionInputKeys.periodType && value === PeriodogramPeriodType.WELCH) {
    return 'Welch'
  }

  return key
}

export const getSelectOptionMenuItem = (key: MultipleOptionInputKeys, value: any) => (
  <MenuItem
    key={value}
    value={value}
  >
    { getMenuItemLabel(key, value) }
  </MenuItem>
)

export const getStringInputOptions = (key: MultipleOptionInputKeys): JSX.Element[] | null => {
  if (key === MultipleOptionInputKeys.periodType) {
    return [
      getSelectOptionMenuItem(key, PeriodogramPeriodType.PER),
      getSelectOptionMenuItem(key, PeriodogramPeriodType.WELCH)
    ]
  }

  return null
}

export type Options = PeriodogramOptions | FitGroupOptions

export type GetOnOptionChange = (key: string, option: any) => (event: React.ChangeEvent<HTMLInputElement>) => void

export const optionToInput = (key: string, option: any, getOnChange: GetOnOptionChange): JSX.Element | null => {

  const onChange = getOnChange(key, option)

  console.log('option', option)

  if (typeof option === 'boolean') {
    return <FormControlLabel
      label={key}
      control={<Checkbox key={key} id={key} checked={option} onChange={onChange} />}
    />
  }

  if (typeof option === 'number') {
    const limits = getNumberInputLimits(key)

    return <TextField label={key} variant='outlined'  margin='normal' type='number' key={key} id={key} value={option} onChange={onChange} inputProps={limits} />
  }
  if (typeof option === 'string') {
    const selectOptions: JSX.Element[] | null = getStringInputOptions(key as MultipleOptionInputKeys)
  
    if (selectOptions !== null) {
      return <TextField label={key} variant='outlined' margin='normal' type='number' key={key} id={key} value={option} onChange={onChange} select>
        { selectOptions }
      </TextField>

    }
  }

  console.log('typeof ', option, 'is', typeof option)

  return null
}

const parseEventValue = (optionValue: any, event: React.ChangeEvent<HTMLInputElement>): string | number | boolean => {

  console.log('typeof optionValue', typeof optionValue)

  if (typeof optionValue === 'boolean') {
    return event.target.checked
  }
  else if (typeof optionValue === 'number') {
    return event.target.valueAsNumber
  }

  return event.target.value
}

export const getAnalysisOptionsHook = (
  command: CosinorCommand,
  options: FormDataOptions,
  setOptions: SetOptions,
): JSX.Element[] => {
  const commandOptionsOptions = options[command]

  const callback: GetOnOptionChange = (key: string, value: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const newOptions = {
      ...options[command],
      [key]: parseEventValue(value, event),
    }

    console.log('OnChange', key, value, newOptions)

    setOptions(command, newOptions)
  }

  return Object.keys(commandOptionsOptions).reduce((list: JSX.Element[], key: string): JSX.Element[] => {
    const element: JSX.Element | null = optionToInput(key, commandOptionsOptions[key as keyof typeof commandOptionsOptions], callback)

    if (element !== null) {
      return [...list, element]
    }

    return list
  }, [])
}