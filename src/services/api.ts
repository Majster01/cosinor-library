import axios, { AxiosResponse } from 'axios'
import { FormDataOptions } from '../options/settings-form'

export interface DataFramePoint {
  x: number,
  y: number,
}

export interface GetCosinorDataBody {
  file?: string,
  command: CosinorCommand
  options: FormDataOptions,
}

export enum CosinorCommand {
  PERIODOGRAM = 'periodogram',
  FIT_GROUP = 'fit_group',
}

export interface Graph {
  command: CosinorCommand,
  data: string,
}

export type GetCosinorDataResponse = DataFramePoint[]

export const getCosinorData = async (body: GetCosinorDataBody): Promise<Graph[]> => {
  const response: AxiosResponse<Graph[]> = await axios.post('/v1/cosinor', body)

  return response.data
}