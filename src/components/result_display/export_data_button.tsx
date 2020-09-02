import React, { useState, ChangeEvent } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import GetAppIcon from '@material-ui/icons/GetApp'
import { Dialog, TextField, Button, DialogContent, DialogActions, DialogContentText } from '@material-ui/core'
import { saveAs } from 'file-saver'


export const ExportDataButton: React.FC = () => {
  const resultsData: string | null | undefined = useSelector((state: RootState) => state.options.responseData?.data)

  const [open, setOpen] = useState<boolean>(false)
  const [fileName, setFileName] = useState<string>('results.csv')

  if (resultsData === null && resultsData === undefined) {
    return null
  }

  const onFileNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value)
  }

  const CSV_REGEX: RegExp = /^.*.csv$/

  const exportFile = () => {
    if (resultsData !== null && resultsData !== undefined) {
      const blob: Blob = new Blob([resultsData], { type: "text/plain;charset=utf-8"} ) 

      const isCsvStringFile: boolean = CSV_REGEX.test(fileName)

      saveAs(blob, `${fileName}${!isCsvStringFile ? '.csv' : ''}`);
    }
  }

  return <div>
    <GetAppIcon onClick={() => setOpen(true)} />
    <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
      <DialogContent>
        <DialogContentText>Save as:</DialogContentText>
        <TextField value={fileName} onChange={onFileNameChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={exportFile}>Save</Button>
      </DialogActions>
    </Dialog>
  </div>
}