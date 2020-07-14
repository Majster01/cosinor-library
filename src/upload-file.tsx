import React, { RefObject, useEffect } from 'react'
import { TextField } from '@material-ui/core'

export interface UploadFileProps {
  onChange(event: React.ChangeEvent<HTMLInputElement>): void
}

export const UploadFile: React.FC<UploadFileProps> = (props: UploadFileProps) => {

  const {
    onChange
  } = props

  const inputRef: RefObject<HTMLInputElement> = React.createRef()

  console.log('inputRef.current', inputRef.current)
  useEffect(() => {
    if (inputRef.current !== null)
    inputRef.current.accept = '.csv'
  }, [inputRef.current !== null])

  return (
    <TextField
      type="file"
      name='file'
      label={'Upload file'}
      inputRef={inputRef}
      onChange={onChange}
    />
  )
}