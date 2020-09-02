import React, { ChangeEvent } from 'react'
import { TextField } from '@material-ui/core'

export interface NumberInputProps {
  key: string
  label: string
  value: number
  onChange(value: number): void
}

export const NumberInput = (props: NumberInputProps) => {

  const {
    key,
    label,
    value,
    onChange,
  } = props

  const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value: number = Number(event.target.value)

    onChange(value)
  }

  return (
    <div>
      <TextField
        label={label}
        margin='normal'
        type='number'
        key={key}
        id={key}
        value={value}
        onChange={onValueChange}
      />
    </div>
  )
}
