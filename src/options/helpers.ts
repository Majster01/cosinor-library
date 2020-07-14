import { PeriodogramOptions, PeriodogramPeriodType, FitGroupOptions } from "./analysis_options_hooks";

export const getDefaultPeriodogramOptions = (): PeriodogramOptions => ({
  periodType: PeriodogramPeriodType.PER,
  logScale: false,
  prominent: false,
  maxPeriod: 240,
})

export const getDefaultFitGroupOptions = (): FitGroupOptions => ({
  period: 24,
  components: 2
})
