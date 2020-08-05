import React, { useState, ChangeEvent } from 'react'
import { GenerateDataBody, generateTestData } from '../../../services/api'
import { TextField, MenuItem, Button } from '@material-ui/core'

export interface AnalysisOptionsFormData {
  components?: string,
  period?: string,
  amplitudes?: string,
  noise?: string,
}

export interface AnalysisOptionsProps {
  onDataCallback(data: string[][]): void
}

export const AnalysisOptions: React.FC<AnalysisOptionsProps> = (props: AnalysisOptionsProps) => {

  const {
    onDataCallback
  } = props

  const [formData, setFormData] = useState<GenerateDataBody>({})

  const onComponentsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      components: Number(event.target.value)
    }))
  }

  const onSubmit = async () => {
    const response = await generateTestData(formData)

    onDataCallback(response.data)
  }


  return (
    <div>
      <TextField label='Components' onChange={onComponentsChange} select> 
        <MenuItem key='1' value={1}>1</MenuItem>
        <MenuItem key='2' value={2}>2</MenuItem>
        <MenuItem key='3' value={3}>3</MenuItem>
      </TextField>
      <Button onClick={onSubmit}>Submit</Button>
    </div>
  )
}