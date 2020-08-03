import React, { useState } from 'react'
import { getCosinorData, GetCosinorDataBody, CosinorCommand, CosinorType } from '../services/api'
import { UploadFile } from '../upload-file'
import { Button, TextField, MenuItem } from '@material-ui/core'
import { AnalysisOptions } from './analysis_options'
import { PeriodogramOptions, Options, FitGroupOptions } from './analysis_options_hooks'
import { getDefaultPeriodogramOptions, getDefaultFitGroupOptions } from './helpers'
import { CsvToHtmlTable } from 'react-csv-to-table'
import { parse, ParseResult } from 'papaparse'

export interface SettingsFormProps {
  onSubmitCallback: Function
  onCommandChange: Function
  onCosinorTypeChange: Function
}

export interface FormDataOptions {
  [CosinorCommand.PERIODOGRAM]: PeriodogramOptions
  [CosinorCommand.FIT_GROUP]: FitGroupOptions,
}

export interface FormData {
  file?: string
  command: CosinorCommand
  cosinorType: CosinorType
  options: FormDataOptions
}

export const fileToString = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();

  reader.onload = () => resolve(reader.result as string);
  reader.onerror = error => reject(error);

  reader.readAsText(file)
});


export const SettingsForm: React.FC<SettingsFormProps> = (props: SettingsFormProps) => {
  
  const {
    onSubmitCallback
  } = props

  const [formData, setFormData] = useState<FormData>({
    file: undefined,
    command: CosinorCommand.PERIODOGRAM,
    cosinorType: CosinorType.COSINOR,
    options: {
      [CosinorCommand.PERIODOGRAM]: getDefaultPeriodogramOptions(),
      [CosinorCommand.FIT_GROUP]: getDefaultFitGroupOptions(),
    }
  })

  const setOptions = (command: CosinorCommand, type: CosinorType, options: Partial<Options>) => (
    setFormData((prevState: FormData) => ({
      ...prevState,
      options: {
        ...prevState.options,
        [command]: {
          ...prevState.options[command],
          [type]: {
            ...prevState.options[command][type],
            ...options,
          }
        }
      }
    }))
  )

  const getCommandOptions = (): JSX.Element[] => {
    return Object.values(CosinorCommand).map((command: string) => <MenuItem key={command} value={command}>{ command }</MenuItem>)
  }

  const getCosinorTypeOptions = (command: CosinorCommand): JSX.Element[] => {
    return Object.values(CosinorType).map((cosinorType: string) => {
      if (command === CosinorCommand.PERIODOGRAM && cosinorType === CosinorType.COSINOR1) {
        return <MenuItem key={cosinorType} disabled value={cosinorType}>{ cosinorType }</MenuItem>
      }

      return <MenuItem key={cosinorType} value={cosinorType}>{ cosinorType }</MenuItem>
    })
  }

  const resetTypeIfDisabled = (command: CosinorCommand, cosinorType: CosinorType): CosinorType => {
    if (command === CosinorCommand.PERIODOGRAM && cosinorType === CosinorType.COSINOR1) {
      return CosinorType.COSINOR
    }

    return cosinorType
  }

  const onCommandChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const command: CosinorCommand = event.target.value as CosinorCommand
    const cosinorType: CosinorType = resetTypeIfDisabled(command, formData.cosinorType)

    setFormData((prev: FormData) => ({
      ...prev,
      command,
      cosinorType,
    }))
    props.onCommandChange(command)
    props.onCosinorTypeChange(cosinorType)
  }

  const onCosinorTypeChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const cosinorType: CosinorType = event.target.value as CosinorType

    setFormData((prev: FormData) => ({
      ...prev,
      cosinorType,
    }))
    props.onCosinorTypeChange(cosinorType)
  }

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('onFileChange', event.target.value, event.target.files)
    const fileString: string | undefined = event.target.files !== null && event.target.files.length > 0
      ? await fileToString(event.target.files[0])
      : undefined
  
    if (fileString !== undefined) {
      setFormData((prev: FormData) => ({
        ...prev,
        file: fileString,
      }))
    }
  }


  const onSubmit = async () => {
    console.log('ON SUBMIT', formData)

    // const file: ParseResult<string[]> | undefined = formData.file ? parse<string[]>(formData.file) : undefined

    // console.log('PARSED FILE', file)
    // console.log('PARSED FILE TYPE', typeof file)

    const getCosinorDataBody: GetCosinorDataBody = {
      file: formData.file,
      command: formData.command,
      cosinorType: formData.cosinorType,
      options: formData.options,
    }

    const cosinorData = await getCosinorData(getCosinorDataBody)

    onSubmitCallback(formData.command, formData.cosinorType, cosinorData)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <TextField onChange={onCommandChange} defaultValue={CosinorCommand.PERIODOGRAM} label={'Analysis'} select>
          { getCommandOptions() }
        </TextField>
        <TextField onChange={onCosinorTypeChange} value={formData.cosinorType} label={'Cosinor type'} select>
          { getCosinorTypeOptions(formData.command) }
        </TextField>
        <UploadFile onChange={onFileChange} />
        <AnalysisOptions command={formData.command} cosinorType={formData.cosinorType} options={formData.options} setOptions={setOptions}/>
        <Button onClick={onSubmit}>Submit</Button>
      </form>
      { formData.file && <CsvToHtmlTable
        data={formData.file}
      />}
    </div>
  )
}