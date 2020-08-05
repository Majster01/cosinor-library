import { PeriodogramPeriodType } from "../../../options/analysis_options_hooks";
import { ReactNode, Dispatch, SetStateAction } from "react";

interface InputDataProps<T> {
  state: T
  setState: Dispatch<SetStateAction<T>>
}

export type InputProps<T> = InputDataProps<T> & { children?: ReactNode }

export interface BasePeriodTypeProps {
  periodType: PeriodogramPeriodType
}

export interface BaseLogScaleProps {
  logScale: boolean,
}

export interface BaseProminentProps {
  prominent: boolean,
}

export interface BaseMaxPeriodProps {
  maxPeriod: number,
}