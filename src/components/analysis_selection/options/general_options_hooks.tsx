import { CosinorCommand, CosinorType, FitType } from '../../../services/api'
import { Dispatch } from 'redux'
import { setCosinorType } from '../../../store/options_slice'
import { SelectInputOption } from '../../global/inputs/select_input'

export interface GetGeneralOptionsHookParams {
  cosinorType: CosinorType,
  cosinorCommand: CosinorCommand,
  fitType: FitType
  dispatch: Dispatch,
}
export interface GetGeneralOptionsHookResponse {
  cosinorTypeOptions: SelectInputOption[],
  cosinorCommandOptions: SelectInputOption[]
  fitTypeOptions: SelectInputOption[]
}

const generalCosinorMenuItem: SelectInputOption = {
  label: 'General cosinor',
  value: CosinorType.COSINOR
}

const cosinor1MenuItem: SelectInputOption = {
  label: 'Cosinor 1',
  value: CosinorType.COSINOR1
}

const periodogramMenuItem: SelectInputOption = {
  label: 'Periodogram',
  value: CosinorCommand.PERIODOGRAM
}

const regressionMenuItem: SelectInputOption = {
  label: 'Regression',
  value: CosinorCommand.FIT_GROUP
}

const comparisonMenuItem: SelectInputOption = {
  label: 'Comparison',
  value: CosinorCommand.COMPARISON
}

const populationMenuItem: SelectInputOption = {
  label: 'Population fit',
  value: FitType.POPULATION
}

const independentMenuItem: SelectInputOption = {
  label: 'Independent fit',
  value: FitType.INDEPENDENT
}

export const useGetGeneralOptionsHook = ({
  cosinorCommand,
  cosinorType,
  fitType,
  dispatch,
}: GetGeneralOptionsHookParams): GetGeneralOptionsHookResponse | null => {
  if (cosinorCommand === CosinorCommand.PERIODOGRAM) {
    if (cosinorType === CosinorType.COSINOR1) {
      dispatch(setCosinorType(CosinorType.COSINOR))
    }

    return {
      cosinorCommandOptions: [periodogramMenuItem, regressionMenuItem, comparisonMenuItem],
      cosinorTypeOptions: [generalCosinorMenuItem],
      fitTypeOptions: []
    }
  }

  if (cosinorCommand === CosinorCommand.COMPARISON) {
    if (cosinorType === CosinorType.COSINOR && fitType === FitType.POPULATION) {
      dispatch(setCosinorType(CosinorType.COSINOR1))

      return {
        cosinorCommandOptions: [periodogramMenuItem, regressionMenuItem, comparisonMenuItem],
        cosinorTypeOptions: [cosinor1MenuItem],
        fitTypeOptions: [independentMenuItem, populationMenuItem]
      }
    }

    return {
      cosinorCommandOptions: [periodogramMenuItem, regressionMenuItem, comparisonMenuItem],
      cosinorTypeOptions: [generalCosinorMenuItem, cosinor1MenuItem],
      fitTypeOptions: [independentMenuItem, populationMenuItem]
    }
  }

  else {
    return {
      cosinorCommandOptions: [periodogramMenuItem, regressionMenuItem, comparisonMenuItem],
      cosinorTypeOptions: [generalCosinorMenuItem, cosinor1MenuItem],
      fitTypeOptions: [independentMenuItem, populationMenuItem],
    }
  }
}
