import { Graph } from "../../../services/api";

export interface GeneralOptionProps {
  onOptionsSubmit(graphs: Graph[]): void
}

export enum PeriodogramPeriodType {
  PER = 'per',
  WELCH = 'welch'
}