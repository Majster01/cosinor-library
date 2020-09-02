import { CosinorType, CosinorCommand, PythonResponse, FitType } from "../../services/api";
import { PeriodogramOptionsForm } from "./options/periodogram_options";
import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { setResponseData } from "../../store/options_slice"
import { RegressionOptionsForm } from "./options/regression_options";
import { ComparisonAnalysisOptionsForm } from "./options/comparison_options";


export const useGetOptionsHook = (): JSX.Element | null => {

  const dispatch = useDispatch()

  const onSubmit = (response: PythonResponse) => {
    dispatch(setResponseData(response))
  }

  const cosinorType: CosinorType = useSelector((state: RootState) => state.options.cosinorType)
  const cosinorCommand: CosinorCommand = useSelector((state: RootState) => state.options.command)
  const fitType: FitType = useSelector((state: RootState) => state.options.fitType)

  console.log('cosinorCommand', cosinorCommand)
  if (cosinorCommand === CosinorCommand.PERIODOGRAM && cosinorType === CosinorType.COSINOR) {
    return <PeriodogramOptionsForm cosinorType={cosinorType} cosinorCommand={cosinorCommand} fitType={fitType} onOptionsSubmit={onSubmit} />
  }

  if (cosinorCommand === CosinorCommand.FIT_GROUP) {
    return <RegressionOptionsForm cosinorType={cosinorType} cosinorCommand={cosinorCommand} fitType={fitType} onOptionsSubmit={onSubmit} />
  }

  if (cosinorCommand === CosinorCommand.COMPARISON) {
    return <ComparisonAnalysisOptionsForm cosinorType={cosinorType} cosinorCommand={cosinorCommand} fitType={fitType} onOptionsSubmit={onSubmit} />
  }

  return null
}