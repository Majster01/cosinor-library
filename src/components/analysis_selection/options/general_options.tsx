import React from 'react'
import { CosinorCommand, CosinorType, FitType } from '../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useGetGeneralOptionsHook, GetGeneralOptionsHookResponse } from './general_options_hooks';
import { setCommand, setCosinorType, setFitType } from '../../../store/options_slice';
import { SelectInput } from '../../global/inputs/select_input';

export const GeneralOptions: React.FC = () => {

  const dispatch = useDispatch()

  const onCosinorCommandChange = (value: string) => {
    const cosinorCommand: CosinorCommand = value as CosinorCommand

    dispatch(setCommand(cosinorCommand))
  }

  const onCosinorTypeChange = (value: string) => {
    const cosinorType: CosinorType = value as CosinorType

    dispatch(setCosinorType(cosinorType))
  }

  const onFitTypeChange = (value: string) => {
    const fitType: FitType = value as FitType

    dispatch(setFitType(fitType))
  }

  const cosinorType: CosinorType = useSelector((state: RootState) => state.options.cosinorType)
  const cosinorCommand: CosinorCommand = useSelector((state: RootState) => state.options.command)
  const fitType: FitType = useSelector((state: RootState) => state.options.fitType)

  const options: GetGeneralOptionsHookResponse | null = useGetGeneralOptionsHook({
    cosinorType,
    cosinorCommand,
    fitType,
    dispatch,
  })

  if (options === null) {
    return null
  }

  const {
    cosinorCommandOptions,
    cosinorTypeOptions,
    fitTypeOptions,
  } = options

  const showFitType: boolean = fitTypeOptions.length > 0

  return (
    <div>
      <SelectInput
        key='cosinor analysis'
        label='Cosinor analysis'
        options={cosinorCommandOptions}
        onChange={onCosinorCommandChange}
        value={cosinorCommand}
      />
      <SelectInput
        key='cosinor type'
        label='Cosinor type'
        options={cosinorTypeOptions}
        onChange={onCosinorTypeChange}
        value={cosinorType}
      />
      { showFitType && <SelectInput
        key='fit type'
        label='Fit type'
        options={fitTypeOptions}
        onChange={onFitTypeChange}
        value={fitType}
      />}
    </div>
  )
}
