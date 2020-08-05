import React from 'react'
import { ChangeEvent } from "react";
import { TextField } from "@material-ui/core";
import { CosinorCommand, CosinorType } from '../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useGetGeneralOptionsHook, GetGeneralOptionsHookResponse } from './general_options_hooks';
import { setCommand, setCosinorType } from '../../../store/options_slice';

export const GeneralOptions: React.FC = () => {

  const dispatch = useDispatch()

  const onCosinorCommandChange = (event: ChangeEvent<HTMLInputElement>) => {
    const cosinorCommand: CosinorCommand = event.target.value as CosinorCommand

    console.log('onCosinorCommandChange', cosinorCommand)

    dispatch(setCommand(cosinorCommand))
  }

  const onCosinorTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const cosinorType: CosinorType = event.target.value as CosinorType

    console.log('onCosinorTypeChange', cosinorType)

    dispatch(setCosinorType(cosinorType))
  }

  const cosinorType: CosinorType = useSelector((state: RootState) => state.options.cosinorType)
  const cosinorCommand: CosinorCommand = useSelector((state: RootState) => state.options.command)

  console.log('cosinorCommand', cosinorCommand)
  console.log('cosinorType', cosinorType)

  const options: GetGeneralOptionsHookResponse | null = useGetGeneralOptionsHook({
    cosinorType,
    cosinorCommand,
    dispatch,
  })

  if (options === null) {
    return null
  }

  const {
    cosinorCommandOptions,
    cosinorTypeOptions
  } = options

  console.log('cosinorCommandOptions', cosinorCommandOptions)
  console.log('cosinorTypeOptions', cosinorTypeOptions)

  return (
    <div>
      <TextField
        key='cosinor analysis'
        label='Cosinor analysis'
        margin='normal'
        select
        onChange={onCosinorCommandChange}
        value={cosinorCommand}
      >
        {cosinorCommandOptions}
      </TextField>
      <TextField
        key='cosinor type'
        label='Cosinor type'
        margin='normal'
        select
        onChange={onCosinorTypeChange}
        value={cosinorType}
      >
        {cosinorTypeOptions}
      </TextField>
    </div>
  )
}
