import React from 'react'
import { CosinorCommand, CosinorType } from '../../../services/api'
import { MenuItem } from '@material-ui/core'
import { Dispatch } from 'redux'
import { setCosinorType } from '../../../store/options_slice'

export interface GetGeneralOptionsHookParams {
  cosinorType: CosinorType,
  cosinorCommand: CosinorCommand,
  dispatch: Dispatch,
}
export interface GetGeneralOptionsHookResponse {
  cosinorTypeOptions: JSX.Element[],
  cosinorCommandOptions: JSX.Element[]
}

const GeneralCosinorMenuItem = (
  <MenuItem key={CosinorType.COSINOR} value={CosinorType.COSINOR}>General cosinor</MenuItem>
)

const Cosinor1MenuItem = (
  <MenuItem key={CosinorType.COSINOR1} value={CosinorType.COSINOR1}>Cosinor 1</MenuItem>
)

const PeriodogramMenuItem = (
  <MenuItem key={CosinorCommand.PERIODOGRAM} value={CosinorCommand.PERIODOGRAM}>Periodogram</MenuItem>
)

const RegressionMenuItem = (
  <MenuItem key={CosinorCommand.FIT_GROUP} value={CosinorCommand.FIT_GROUP}>Regression</MenuItem>
)

export const useGetGeneralOptionsHook = ({
  cosinorCommand,
  cosinorType,
  dispatch,
}: GetGeneralOptionsHookParams): GetGeneralOptionsHookResponse | null => {
  if (cosinorCommand === CosinorCommand.PERIODOGRAM) {
    if (cosinorType === CosinorType.COSINOR1) {
      dispatch(setCosinorType(CosinorType.COSINOR))
    }

    return {
      cosinorCommandOptions: [PeriodogramMenuItem, RegressionMenuItem],
      cosinorTypeOptions: [GeneralCosinorMenuItem]
    }
  }

  if (cosinorCommand === CosinorCommand.FIT_GROUP) {
    return {
      cosinorCommandOptions: [PeriodogramMenuItem, RegressionMenuItem],
      cosinorTypeOptions: [GeneralCosinorMenuItem, Cosinor1MenuItem]
    }
  }

  return null
}