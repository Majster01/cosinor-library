import React, { ChangeEvent } from 'react'
import { FormControlLabel, Checkbox } from '@material-ui/core'
import { InputProps, BaseLogScaleProps } from './interfaces'

export const LogScaleInput = <T extends BaseLogScaleProps>(props: InputProps<T>) => {

  const {
    state,
    setState,
  } = props

  const onLogScaleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const logScale: boolean = event.target.checked

    setState((prev: T) => ({
      ...prev,
      logScale,
    }))
  }

  const {
    logScale
  } = state

  return (
    <div>
      <FormControlLabel
        label={'Log scale'}
        control={<Checkbox
          key='log scale'
          onChange={onLogScaleChange}
          checked={logScale}
        />}
      />
    </div>
  )
}
