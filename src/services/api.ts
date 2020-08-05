import axios, { AxiosResponse } from 'axios'
import { FormDataOptions } from '../options/settings-form'
import { ParseResult, parse } from 'papaparse'

export interface DataFramePoint {
  x: number,
  y: number,
}

export interface RunAnalysisBody {
  data: string,
  command: CosinorCommand
  cosinorType: CosinorType
  options: object,
}

export interface GenerateDataBody {
  components?: number | number[],
  period?: number,
  amplitudes?: number,
  noise?: number,
}

export enum CosinorCommand {
  PERIODOGRAM = 'periodogram',
  FIT_GROUP = 'fit_group',
}


export enum CosinorType {
  COSINOR = 'general cosinor',
  COSINOR1 = 'cosinor1',
}

export interface Graph {
  command: CosinorCommand,
  data: string[],
}

export type GetCosinorDataResponse = DataFramePoint[]

export const runCosinorAnalysis = async (body: RunAnalysisBody): Promise<Graph[]> => {
  const response: AxiosResponse<Graph[]> = await axios.post('/v1/cosinor', body)

  return response.data
}

export const generateTestData = async (body: GenerateDataBody): Promise<ParseResult<string[]>> => {
  console.log('BODY', body)
  const response: AxiosResponse<string> = await axios.post('/v1/generate-data', body)

  const csvString =  response.data

  const parsedCsv: ParseResult<string[]> = parse<string[]>(csvString, {})

  return parsedCsv
}