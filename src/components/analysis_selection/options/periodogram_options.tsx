import React from 'react'
import { GeneralOptionProps, PeriodogramPeriodType } from "./interfaces";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { runPeriodogramAnalysis, CosinorType, PythonResponse } from '../../../services/api'
import { LoadingButton } from '../../global/loading_button/loading_button';
import { useFlowStepperContext, FlowStepperState } from '../../global/stepper/flow_stepper_context';
import { NumberInput } from '../../global/inputs/number_input';
import { SelectInputOption, SelectInput } from '../../global/inputs/select_input';
import { CheckboxInput } from '../../global/inputs/checkbox_input';
import { Button } from '@material-ui/core';
import { useStyles } from './styles';
import { FileType } from '../../../store/options_slice';
import { getFileStringByType, CSVFile, hasReplicates } from '../../../utils/csv_file_helpers';
import { WorkBook } from 'xlsx/types';

export interface PeriodogramGeneralCosinorOptions {
  periodType: PeriodogramPeriodType,
  logScale: boolean,
  maxPeriod: number,
  minPeriod: number,
}

const defaultPeriodogramGeneralCosinorOptions: PeriodogramGeneralCosinorOptions = {
  periodType: PeriodogramPeriodType.FOURIER,
  logScale: false,
  maxPeriod: 24,
  minPeriod: 2,
}

export const PeriodogramOptionsForm: React.FC<GeneralOptionProps> = (props: GeneralOptionProps) => {

  const classes = useStyles()

  const [state, setState] = useState<PeriodogramGeneralCosinorOptions>(defaultPeriodogramGeneralCosinorOptions)

  const fileType: FileType | undefined = useSelector((state: RootState) => state.options.fileType)
  const selectedData: CSVFile | WorkBook | undefined = useSelector((state: RootState) => fileType ? state.options[fileType].selectedData : undefined)

  const flowStepperContext: FlowStepperState = useFlowStepperContext()

  const onSubmit = async () => {
    if (selectedData !== undefined && fileType !== undefined) {

      const hasXlsxReplicates: boolean = fileType === FileType.XLSX ? hasReplicates(selectedData as WorkBook) : false
      const fileString: string = getFileStringByType(fileType, selectedData)

      const body = {
        fileType,
        hasXlsxReplicates,
        data: fileString,
        cosinorType: CosinorType.COSINOR,
        per_type: state.periodType,
        logscale: state.logScale,
        max_per: state.maxPeriod,
        min_per: state.minPeriod,
      }

      const response: PythonResponse = await runPeriodogramAnalysis(body)

      props.onOptionsSubmit(response)
    }
  }

  const periodTypeInputOptions: SelectInputOption[] = [
    {
      label: 'Fourier',
      value: PeriodogramPeriodType.FOURIER
    },
    {
      label: 'Welch',
      value: PeriodogramPeriodType.WELCH
    },
    {
      label: 'Lomb–Scargle',
      value: PeriodogramPeriodType.LOMB_SCARGLE
    }
  ]

  const onPeriodTypeChange = (value: string) => {
    const periodType: PeriodogramPeriodType = value as PeriodogramPeriodType
    setState((prev) => ({
      ...prev,
      periodType,
    }))
  }

  const onMaxPeriodChange = (maxPeriod: number) => {
    setState((prev) => ({
      ...prev,
      maxPeriod,
    }))
  }

  const onMinPeriodChange = (minPeriod: number) => {
    setState((prev) => ({
      ...prev,
      minPeriod,
    }))
  }

  const onLogScaleChange = (logScale: boolean) => {
    setState((prev) => ({
      ...prev,
      logScale,
    }))
  }

  const disabled: boolean = selectedData === undefined || fileType === undefined

  return <div>
    <SelectInput
      key='periodType'
      label='Method'
      value={state.periodType}
      options={periodTypeInputOptions}
      onChange={onPeriodTypeChange}
    />
    <CheckboxInput
      key='logScale'
      label='Log scale'
      value={state.logScale}
      onChange={onLogScaleChange}
    />
    <NumberInput
      key='minPeriod'
      label='Min period (hours)'
      value={state.minPeriod}
      onChange={onMinPeriodChange}
    />
    <NumberInput
      key='maxPeriod'
      label='Max period (hours)'
      value={state.maxPeriod}
      onChange={onMaxPeriodChange}
    />

    <div className={classes.actionButtons}>
      <Button color='primary' variant='outlined' onClick={flowStepperContext.stepNavigationBack}>Reselect data</Button>
      <LoadingButton color='primary' variant='contained' disabled={disabled} onClick={onSubmit}>Submit</LoadingButton>
    </div>
  </div>
}