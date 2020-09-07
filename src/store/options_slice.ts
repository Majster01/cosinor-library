import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CosinorCommand, CosinorType, PythonResponse, FitType } from '../services/api'
import { WorkBook } from 'xlsx/types'
import { CSVFile } from '../utils/csv_file_helpers'

export enum FileType {
  CSV = 'text/csv',
  XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

export interface OptionsSlice {
  csvStringData?: string
  csvTableData?: string[][]
  command: CosinorCommand
  cosinorType: CosinorType
  fitType: FitType
  responseData?: PythonResponse
  fileType?: FileType
  [FileType.CSV]: DataFileMeta<CSVFile>
  [FileType.XLSX]: DataFileMeta<WorkBook>
}

export interface DataFileMeta<D> {
  data?: D
  selectedData?: D
}

const initialState: OptionsSlice = {
  command: CosinorCommand.PERIODOGRAM,
  cosinorType: CosinorType.COSINOR,
  fitType: FitType.INDEPENDENT,
  responseData: undefined,
  fileType: undefined,
  [FileType.CSV]: {},
  [FileType.XLSX]: {},
}

export interface SetCsvDataParams {
  csvStringData: string
  csvTableData: string[][]
}

export interface SetXlsxDataParams {
  workbook: WorkBook,
  base64: string
}

const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setCsvData (state, action: PayloadAction<SetCsvDataParams>) {
      state.csvStringData = action.payload.csvStringData
      state.csvTableData = action.payload.csvTableData
    },
    setCommand (state, action: PayloadAction<CosinorCommand>) {
      state.command = action.payload
    },
    setCosinorType (state, action: PayloadAction<CosinorType>) {
      state.cosinorType = action.payload
    },
    setFitType (state, action: PayloadAction<FitType>) {
      state.fitType = action.payload
    },
    setResponseData (state, action: PayloadAction<PythonResponse>) {
      state.responseData = action.payload
    },
    setFileType (state, action: PayloadAction<FileType>) {
      state.fileType = action.payload
    },
    setCSVMetaData (state, action: PayloadAction<DataFileMeta<CSVFile>>) {
      state[FileType.CSV] = {
        ...state[FileType.CSV],
        ...action.payload,
      }
    },
    setXLSXMetaData (state, action: PayloadAction<DataFileMeta<WorkBook>>) {
      state[FileType.XLSX] = {
        ...state[FileType.XLSX],
        ...action.payload,
      }
    }
  },
})

export const {
  setCsvData,
  setCommand,
  setCosinorType,
  setFitType,
  setResponseData,
  setFileType,
  setCSVMetaData,
  setXLSXMetaData,
} = optionsSlice.actions

export default optionsSlice.reducer
