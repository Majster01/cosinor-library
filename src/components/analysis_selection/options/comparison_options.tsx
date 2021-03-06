import React from 'react'
import { GeneralOptionProps } from "./interfaces";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { CosinorType, PythonResponse, runComparisonAnalysis } from '../../../services/api'
import { LoadingButton } from '../../global/loading_button/loading_button';
import { useFlowStepperContext, FlowStepperState } from '../../global/stepper/flow_stepper_context';
import { SelectInputOption, SelectInput } from '../../global/inputs/select_input';
import { NumberInput } from '../../global/inputs/number_input';
import { Button } from '@material-ui/core';
import { useStyles } from './styles';
import { Tuple, PairSelection } from '../../global/inputs/pair_selection';
import { FileType } from '../../../store/options_slice';
import { getFileStringByType, CSVFile, hasReplicates } from '../../../utils/csv_file_helpers';
import { WorkBook } from 'xlsx/types';

export interface ComparisonAnalysisOptions {
  components: number | null,
  period: number,
  pairs: Tuple[]
}

const defaultComparisonAnalysisOptions: ComparisonAnalysisOptions = {
  components: null,
  period: 24,
  pairs: []
}

export const ComparisonAnalysisOptionsForm: React.FC<GeneralOptionProps> = (props: GeneralOptionProps) => {
  
  const classes = useStyles()

  const {
    cosinorType,
    fitType,
  } = props

  const [state, setState] = useState<ComparisonAnalysisOptions>(defaultComparisonAnalysisOptions)

  const fileType: FileType | undefined = useSelector((state: RootState) => state.options.fileType)
  const selectedData: CSVFile | WorkBook | undefined = useSelector((state: RootState) => fileType ? state.options[fileType].selectedData : undefined)

  const flowStepperContext: FlowStepperState = useFlowStepperContext()

  const onSubmit = async () => {
    if (selectedData !== undefined && fileType !== undefined) {

      const hasXlsxReplicates: boolean = fileType === FileType.XLSX ? hasReplicates(selectedData as WorkBook) : false
      const fileString: string = getFileStringByType(fileType, selectedData)

      const body = {
        fileType,
        fitType,
        hasXlsxReplicates,
        data: fileString,
        cosinorType,
        n_components: state.components ?? [1,2,3],
        period: state.period,
        pairs: state.pairs,
      }

      const response: PythonResponse = await runComparisonAnalysis(body)
      
      props.onOptionsSubmit(response)
    }
  }

  const componentsInputOptions: SelectInputOption[] = [
    {
      label: '1',
      value: 1
    },
    {
      label: '2',
      value: 2
    },
    {
      label: '3',
      value: 3
    },
  ]

  const onComponentsChange = (components: number | null) => {
    setState((prev) => ({
      ...prev,
      components,
    }))
  }

  const onPeriodChange = (period: number) => {
    setState((prev) => ({
      ...prev,
      period,
    }))
  }

  const onPairsChange = (pairs: Tuple[]) => {
    setState((prev) => ({
      ...prev,
      pairs,
    }))
  }

  const disabled: boolean = state.pairs.length === 0
    || selectedData === undefined
    || fileType === undefined

  return <div>
    {cosinorType === CosinorType.COSINOR && <SelectInput
      key='components'
      label='Components'
      value={state.components}
      options={componentsInputOptions}
      onChange={onComponentsChange}
      optional
    />}
    <NumberInput
      key='period'
      label='Period'
      value={state.period}
      onChange={onPeriodChange}
    />
    <PairSelection
      label='Pairs (required)'
      selectedPairs={state.pairs}
      onSelectedPairsChange={onPairsChange}
    />

    <div className={classes.actionButtons}>
      <Button color='primary' variant='outlined' onClick={flowStepperContext.stepNavigationBack}>Reselect data</Button>
      <LoadingButton color='primary' variant='contained' disabled={disabled} onClick={onSubmit}>Submit</LoadingButton>
    </div>
  </div>
}