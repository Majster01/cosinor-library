import React, { useState } from 'react'
import { getCosinorData, GetCosinorDataBody, CosinorCommand } from '../services/api'
import { UploadFile } from '../upload-file'
import { Button, TextField, MenuItem } from '@material-ui/core'
import { AnalysisOptions } from './analysis_options'
import { PeriodogramOptions, Options, FitGroupOptions } from './analysis_options_hooks'
import { getDefaultPeriodogramOptions, getDefaultFitGroupOptions } from './helpers'

export interface SettingsFormProps {
  onSubmitCallback: Function
  onCommandChange: Function
}

export interface FormDataOptions {
  [CosinorCommand.PERIODOGRAM]: PeriodogramOptions
  [CosinorCommand.FIT_GROUP]: FitGroupOptions
}

export interface FormData {
  file?: string
  command: CosinorCommand
  options: FormDataOptions
}

export const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsText(file)
  // reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = error => reject(error);
});


export const SettingsForm: React.FC<SettingsFormProps> = (props: SettingsFormProps) => {
  
  const {
    onSubmitCallback
  } = props

  const [formData, setFormData] = useState<FormData>({
    file: undefined,
    command: CosinorCommand.PERIODOGRAM,
    options: {
      [CosinorCommand.PERIODOGRAM]: getDefaultPeriodogramOptions(),
      [CosinorCommand.FIT_GROUP]: getDefaultFitGroupOptions(),
    }
  })

  const setOptions = (command: CosinorCommand, options: Partial<Options>) => (
    setFormData((prevState: FormData) => ({
      ...prevState,
      options: {
        ...prevState.options,
        [command]: {
          ...prevState.options[command],
          ...options,
        }
      }
    }))
  )

  const getCommandOptions = (): JSX.Element[] => {
    return Object.values(CosinorCommand).map((command: string) => <MenuItem key={command} value={command}>{ command }</MenuItem>)
  }

  const onCommandChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const command: CosinorCommand = event.target.value as CosinorCommand

    setFormData((prev: FormData) => ({
      ...prev,
      command,
    }))
    props.onCommandChange(command)
  }

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('onFileChange', event.target.value, event.target.files)
    const file: string | undefined = event.target.files !== null && event.target.files.length > 0
      ? await toBase64(event.target.files[0])
      : undefined
  
    if (file !== undefined) {
      setFormData((prev: FormData) => ({
        ...prev,
        file,
      }))
    }
  }


  const onSubmit = async () => {
    console.log('ON SUBMIT', formData)

    const getCosinorDataBody: GetCosinorDataBody = {
      file: formData.file,
      command: formData.command,
      options: formData.options,
    }

    const cosinorData = await getCosinorData(getCosinorDataBody)

    onSubmitCallback(formData.command, cosinorData)
  }

  return (
    <form onSubmit={onSubmit}>
      <TextField onChange={onCommandChange} defaultValue={CosinorCommand.PERIODOGRAM} label={'Analysis'} select>
        { getCommandOptions() }
      </TextField>
      <UploadFile onChange={onFileChange} />
      <AnalysisOptions command={formData.command} options={formData.options} setOptions={setOptions}/>
      <Button onClick={onSubmit}>Submit</Button>
    </form>
  )
}