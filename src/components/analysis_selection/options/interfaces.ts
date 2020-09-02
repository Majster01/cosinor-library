import { CosinorType, CosinorCommand, PythonResponse, FitType } from "../../../services/api";

export interface GeneralOptionProps {
  onOptionsSubmit(response: PythonResponse): void
  cosinorType: CosinorType
  cosinorCommand: CosinorCommand
  fitType: FitType
}

export enum PeriodogramPeriodType {
  FOURIER = 'per',
  WELCH = 'welch',
  LOMB_SCARGLE = 'lomb_scargle',
}