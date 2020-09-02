import React, { ChangeEvent } from 'react'
import { TextField, MenuItem } from '@material-ui/core'

export interface SelectInputOption {
  label: string
  value: string | number
}

export interface SelectInputProps {
  value: string | number | null
  optional?: boolean
  key: string
  label: string
  options: SelectInputOption[]
  onChange(value: string | number | null): void
}

const EMPTY_SELECT_VALUE: string = 'None'

export const SelectInput = (props: SelectInputProps) => {

  const {
    key,
    value,
    label,
    options,
    optional,
    onChange,
  } = props

  const onSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value

    if (value === EMPTY_SELECT_VALUE) {
      return onChange(null)
    }

    onChange(value)
  }

  return (
    <div>
      <TextField
        key={key}
        label={label}
        margin='normal'
        select
        fullWidth
        onChange={onSelectChange}
        value={value ?? EMPTY_SELECT_VALUE}
      >
        {optional && (
          <MenuItem key={EMPTY_SELECT_VALUE} value={EMPTY_SELECT_VALUE}>
            {EMPTY_SELECT_VALUE}
          </MenuItem>
        )}
        {options.map((option: SelectInputOption) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  )
}