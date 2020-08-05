import React, { ChangeEvent } from 'react'
import { FormControlLabel, Checkbox } from '@material-ui/core'
import { InputProps, BaseProminentProps } from './interfaces'

export const ProminentInput = <T extends BaseProminentProps>(props: InputProps<T>) => {

  const {
    state,
    setState,
  } = props

  const onProminentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const prominent: boolean = event.target.checked

    setState((prev: T) => ({
      ...prev,
      prominent,
    }))
  }

  const {
    prominent
  } = state

  return (
    <div>
      <FormControlLabel
        label={'Prominent'}
        control={<Checkbox
          key='prominent'
          onChange={onProminentChange}
          checked={prominent}
        />}
      />
    </div>
  )
}
