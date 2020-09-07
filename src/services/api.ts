import axios, { AxiosResponse } from 'axios'
import { ParseResult, parse } from 'papaparse'
import pRetry, { AbortError, } from 'p-retry'

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
  amplitudes?: number[] | null,
  noise?: number,
}

export enum CosinorCommand {
  PERIODOGRAM = 'periodogram',
  FIT_GROUP = 'fit_group',
  COMPARISON = 'comparison',
}

export enum FitType {
  POPULATION = 'POPULATION',
  INDEPENDENT = 'INDEPENDENT',
}


export enum CosinorType {
  COSINOR = 'general cosinor',
  COSINOR1 = 'cosinor1',
}

export interface DataFrameList {
  [key: string]: number | string
}
export interface PythonResponse {
  // tslint:disable-next-line:no-any
  data: string | null,
  graphs: string[]
}
export interface PythonRequestUuidResponseBody {
  uuid: string
}

export enum RequestStatus {
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
  PENDING = 'pending',
}

export interface RequestStatusHandlerResponse {
  uuid: string,
  status: RequestStatus
  data: PythonResponse | null
}

export type GetCosinorDataResponse = DataFramePoint[]

export const runPeriodogramAnalysis = async (body: any): Promise<PythonResponse> => {
  const response: AxiosResponse<PythonResponse> = await axios.post('/v1/periodogram', body, { timeout: 2000000 })

  return response.data
}

export const runFitGroupIndependentAnalysis = async (body: any): Promise<PythonResponse> => {
  const response: AxiosResponse<PythonResponse> = await axios.post('/v1/fit-group-independent', body, { timeout: 2000000 })

  return response.data
}

export const runComparisonAnalysis = async (body: any): Promise<PythonResponse> => {
  const response: AxiosResponse<PythonResponse> = await axios.post('/v1/comparison', body, { timeout: body.pairs.length * 200000 })

  return response.data
}

export const runFitGroupPopulationAnalysis = async (body: any): Promise<PythonResponse> => {
  const response: AxiosResponse<PythonResponse> = await axios.post('/v1/fit-group-population', body, { timeout: 2000000 })

  return response.data
}

export const getRequestByUuid = async (uuid: string) => {
  const response: AxiosResponse<RequestStatusHandlerResponse> = await axios.post('/v1/request-status', { uuid })

  if (response.data.status === RequestStatus.PENDING) {
    throw new Error(RequestStatus.REJECTED)
  }

  if (response.data.status === RequestStatus.REJECTED) {
    throw new AbortError(RequestStatus.REJECTED)
  }

  return response.data
}

export const poolForRequestStatus = async (uuid: string): Promise<RequestStatusHandlerResponse> => {
  return pRetry(() => getRequestByUuid(uuid), { retries: 30 })
}

export const generateTestData = async (body: GenerateDataBody): Promise<ParseResult<string[]>> => {
  const response: AxiosResponse<string> = await axios.post('/v1/generate-data', body)

  const csvString =  response.data

  const parsedCsv: ParseResult<string[]> = parse<string[]>(csvString, {})

  return parsedCsv
}