import React, { ChangeEvent } from 'react'
import { TextField, MenuItem } from '@material-ui/core'
import { PeriodogramPeriodType } from '../../../options/analysis_options_hooks'
import { BasePeriodTypeProps, InputProps } from './interfaces'

export const PeriodTypeInput = <T extends BasePeriodTypeProps>(props: InputProps<T>) => {

  const {
    state,
    setState,
  } = props

  const onPeriodTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const periodType: PeriodogramPeriodType = event.target.value as PeriodogramPeriodType

    setState((prev: T) => ({
      ...prev,
      periodType,
    }))
  }

  const {
    periodType
  } = state

  return (
    <div>
      <TextField
        key='period'
        label='Period'
        margin='normal'
        select
        onChange={onPeriodTypeChange}
        value={periodType}
      >
        <MenuItem key={PeriodogramPeriodType.PER} value={PeriodogramPeriodType.PER}>Period</MenuItem>
        <MenuItem key={PeriodogramPeriodType.WELCH} value={PeriodogramPeriodType.WELCH}>Welch</MenuItem>
      </TextField>
    </div>
  )
}