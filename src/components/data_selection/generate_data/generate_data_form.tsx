import React, { useState } from 'react'
import { generateTestData } from '../../../services/api'
import { SelectInput, SelectInputOption } from '../../global/inputs/select_input'
import { NumberInput } from '../../global/inputs/number_input'
import { LoadingButton } from '../../global/loading_button/loading_button'
import { SelectMultipleInput, SelectMultipleInputOption } from '../../global/inputs/select_multiple_input'
import { useDispatch } from 'react-redux'
import { ParseResult, unparse } from 'papaparse'
import { setCSVMetaData, FileType, setFileType } from '../../../store/options_slice'

export interface GenerateTestDataOptionsFormData {
  components: number,
  period: number,
  amplitudes: number[] | null,
  noise: number,
  replicates: number,
}

export interface GenerateTestDataOptionsProps {
  onDataCallback(data: string[][]): void
}

const defaultGenerateTestDataOptions: GenerateTestDataOptionsFormData = {
  components: 1,
  period: 24,
  amplitudes: [1, 1/2, 1/3, 1/4],
  noise: 0,
  replicates: 1,
}

export const GenerateTestDataOptions: React.FC = () => {

  const [formData, setFormData] = useState<GenerateTestDataOptionsFormData>(defaultGenerateTestDataOptions)

  const onComponentsChange = (components: number) => {
    setFormData((prev) => ({
      ...prev,
      components,
    }))
  }

  const onPeriodChange = (period: number) => {
    setFormData((prev) => ({
      ...prev,
      period,
    }))
  }

  const onAmplitudesChange = (amplitudes: number[] | null) => {
    setFormData((prev) => ({
      ...prev,
      amplitudes,
    }))
  }

  const onNoiseChange = (noise: number) => {
    setFormData((prev) => ({
      ...prev,
      noise,
    }))
  }

  const onReplicatesChange = (replicates: number) => {
    setFormData((prev) => ({
      ...prev,
      replicates,
    }))
  }

  const dispatch = useDispatch()

  const onSubmit = async () => {
    const generatedData: ParseResult<string[]> = await generateTestData(formData)

    const data: string[][] = generatedData.data
    const file: string = unparse(data, { delimiter: '\t'})

    dispatch(setCSVMetaData({
      data,
      selectedData: data,
      file,
    }))
    dispatch(setFileType(FileType.CSV))
  }

  const componentsOptions: SelectInputOption[] = [
    {
      label: '1',
      value: 1,
    },
    {
      label: '2',
      value: 2,
    },
    {
      label: '3',
      value: 3,
    },
  ]

  const amplitudesOptions: SelectMultipleInputOption[] = [
    {
      label: '1',
      value: 1,
    },
    {
      label: '1/2',
      value: 1/2,
    },
    {
      label: '1/3',
      value: 1/3,
    },
    {
      label: '1/4',
      value: 1/4,
    },
  ]

  const {
    components,
    period,
    amplitudes,
    replicates,
    noise
  } = formData

  return (
    <div>
      <SelectInput
        key='components'
        label='Components'
        value={components}
        options={componentsOptions}
        onChange={onComponentsChange}
      />
      <NumberInput
        key='period'
        label='Period'
        value={period}
        onChange={onPeriodChange}
      />
      <SelectMultipleInput
        key='amplitudes'
        label='Amplitudes'
        value={amplitudes}
        onChange={onAmplitudesChange}
        options={amplitudesOptions}
      />
      <NumberInput
        key='replicates'
        label='Replicates'
        value={replicates}
        onChange={onReplicatesChange}
      />
      <NumberInput
        key='noise'
        label='Noise'
        value={noise}
        onChange={onNoiseChange}
      />
      <LoadingButton onClick={onSubmit}>Submit</LoadingButton>
    </div>
  )
}