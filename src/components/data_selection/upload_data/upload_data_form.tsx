import React from 'react'
import { UploadFile } from '../../global/inputs/upload-file';
import { useDispatch } from 'react-redux';
import { ValidFileTooltips } from './valid_file_tooltips';
import { readFile } from '../../../utils/csv_file_helpers'

export const UploadDataForm: React.FC = () => {

  const dispatch = useDispatch()

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

    await readFile(dispatch, event.target.files !== null && event.target.files.length > 0
      ? event.target.files[0]
      : undefined
    )
  }

  return (
    <div>
      <UploadFile onChange={onFileChange} />
      <ValidFileTooltips />
    </div>
  )
}
