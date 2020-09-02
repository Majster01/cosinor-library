import React from 'react'
import { MenuItem, FormControl, InputLabel, Select, Input, Chip } from '@material-ui/core'
import { useStyles } from './styles'

export interface SelectMultipleInputOption {
  label: string
  value: number
}

export interface SelectInputProps {
  value: number[] | null
  label: string
  options: SelectMultipleInputOption[]
  onChange(value: number[] | null): void
}

const getLabel = (options: SelectMultipleInputOption[], value: number): string => {
  const selectedOption: SelectMultipleInputOption | undefined = options.find(
    (option: SelectMultipleInputOption) => option.value === value
  )

  if (selectedOption === undefined) {
    return value.toString()
  }

  return selectedOption.label
}

export const SelectMultipleInput = (props: SelectInputProps) => {

  const {
    value,
    label,
    options,
    onChange,
  } = props


  const classes = useStyles()

  const onSelectChange = (event: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
  }>) => {
    const value: number[] = event.target.value as number[]

    onChange(value)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-mutiple-chip-label">{label}</InputLabel>
      <Select
        labelId="demo-mutiple-chip-label"
        id="demo-mutiple-chip"
        multiple
        value={value}
        onChange={onSelectChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {(selected as number[]).map((value) => (
              <Chip key={value} label={getLabel(options, value)} className={classes.chip} />
            ))}
          </div>
        )}
      >
        {options && options.map((option: SelectMultipleInputOption) => (
          <MenuItem className={
            value !== null && value.indexOf(option.value) === -1
              ? classes.selected
              : classes.notSelected
          } key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    
  )
}