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

  const refIsDefined: boolean = inputRef.current !== null

  console.log('inputRef.current', inputRef.current)
  useEffect(() => {
    if (inputRef.current !== null)
      inputRef.current.accept = '.csv,.xlsx'
  }, [inputRef, refIsDefined])

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