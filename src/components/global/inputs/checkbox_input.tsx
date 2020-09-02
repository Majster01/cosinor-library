import React, { ChangeEvent } from 'react'
import { FormControlLabel, Checkbox } from '@material-ui/core'

export interface CheckboxInputProps {
  key: string
  label: string
  value: boolean
  disabled?: boolean
  onChange(value: boolean): void
}

export const CheckboxInput = (props: CheckboxInputProps) => {

  const {
    key,
    label,
    value,
    disabled,
    onChange,
  } = props

  const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value: boolean = event.target.checked

    onChange(value)
  }

  return (
    <div>
      <FormControlLabel
        label={label}
        disabled={disabled}
        control={<Checkbox
          key={key}
          color='primary' 
          disabled={disabled}
          onChange={onValueChange}
          checked={value}
        />}
      />
    </div>
  )
}
