import React, { ChangeEvent } from 'react'
import { InputProps, BaseMaxPeriodProps } from './interfaces'
import { TextField } from '@material-ui/core'

export const MaxPeriodInput = <T extends BaseMaxPeriodProps>(props: InputProps<T>) => {

  const {
    state,
    setState,
  } = props

  const onMaxPeriodChange = (event: ChangeEvent<HTMLInputElement>) => {
    const maxPeriod: number = Number(event.target.value)

    setState((prev: T) => ({
      ...prev,
      maxPeriod,
    }))
  }

  const {
    maxPeriod
  } = state

  return (
    <div>
      <TextField
        label='Max period'
        margin='normal'
        type='number'
        key='maxPeriod'
        id='maxPeriod'
        value={maxPeriod}
        onChange={onMaxPeriodChange}
      />
    </div>
  )
}
