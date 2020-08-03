import { PeriodogramOptions, PeriodogramPeriodType, FitGroupOptions } from "./analysis_options_hooks";
import { CosinorType } from "../services/api";

export const getDefaultPeriodogramOptions = (): PeriodogramOptions => ({
  [CosinorType.COSINOR]: {
    periodType: PeriodogramPeriodType.PER,
    logScale: false,
    prominent: false,
    maxPeriod: 240,
  },
  [CosinorType.COSINOR1]: {},
})

export const getDefaultFitGroupOptions = (): FitGroupOptions => ({
  [CosinorType.COSINOR]: {
    period: 24,
    components: 2
  },
  [CosinorType.COSINOR1]: {
    period: 24,
  },
})
