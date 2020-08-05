import { CosinorType, CosinorCommand, Graph } from "../../services/api";
import { PeriodogramGeneralCosinorOptionsForm } from "./options/periodogram_options";
import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { setGraphs } from "../../store/options_slice"


export const useGetOptionsHook = (): JSX.Element | null => {

  const dispatch = useDispatch()

  const onSubmit = (graphs: Graph[]) => {
    console.log('hooks on submit')
    dispatch(setGraphs(graphs))
  }

  const cosinorType: CosinorType = useSelector((state: RootState) => state.options.cosinorType)
  const cosinorCommand: CosinorCommand = useSelector((state: RootState) => state.options.command)

  if (cosinorCommand === CosinorCommand.PERIODOGRAM && cosinorType === CosinorType.COSINOR) {
    return <PeriodogramGeneralCosinorOptionsForm onOptionsSubmit={onSubmit} />
  }

  return null
}