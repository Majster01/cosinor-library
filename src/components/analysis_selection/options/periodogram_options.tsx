import React from 'react'
import { GeneralOptionProps, PeriodogramPeriodType } from "./interfaces";
import { useState, ChangeEvent } from "react";
import { TextField, Checkbox, FormControlLabel, Button } from "@material-ui/core";
import { PeriodTypeInput } from '../inputs/period_type_input';
import { LogScaleInput } from '../inputs/log_scale_input';
import { ProminentInput } from '../inputs/prominent_input';
import { MaxPeriodInput } from '../inputs/max_period_input';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { RunAnalysisBody, runCosinorAnalysis, CosinorCommand, CosinorType, Graph } from '../../../services/api'

export interface PeriodogramGeneralCosinorOptions {
  periodType: PeriodogramPeriodType,
  logScale: boolean,
  prominent: boolean,
  maxPeriod: number,
}

const defaultPeriodogramGeneralCosinorOptions: PeriodogramGeneralCosinorOptions = {
  periodType: PeriodogramPeriodType.PER,
  logScale: false,
  prominent: false,
  maxPeriod: 24,
}

export const PeriodogramGeneralCosinorOptionsForm: React.FC<GeneralOptionProps> = (props: GeneralOptionProps) => {

  const [state, setState] = useState<PeriodogramGeneralCosinorOptions>(defaultPeriodogramGeneralCosinorOptions)

  const selectedDataCsv: string | undefined = useSelector((state: RootState) => state.options.csvStringData)

  console.log('selectedDataCsv', selectedDataCsv)

  const onSubmit = async () => {
    if (selectedDataCsv !== undefined) {

      const body: RunAnalysisBody = {
        data: selectedDataCsv,
        command: CosinorCommand.PERIODOGRAM,
        cosinorType: CosinorType.COSINOR,
        options: state,
      }

      const graphs: Graph[] = await runCosinorAnalysis(body)

      props.onOptionsSubmit(graphs)
    }
  }

  return <div>
    <PeriodTypeInput state={state} setState={setState} />
    <LogScaleInput state={state} setState={setState} />
    <ProminentInput state={state} setState={setState} />
    <MaxPeriodInput state={state} setState={setState} />
    <div>
      <Button disabled={selectedDataCsv === undefined} onClick={onSubmit}>Submit</Button>
    </div>
  </div>
}