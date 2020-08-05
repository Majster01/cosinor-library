import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CosinorCommand, CosinorType, Graph } from '../services/api'

export interface OptionsSlice {
  csvStringData?: string
  csvTableData?: string[][]
  command: CosinorCommand
  cosinorType: CosinorType
  graphs: Graph[]
}

const initialState: OptionsSlice = {
  command: CosinorCommand.PERIODOGRAM,
  cosinorType: CosinorType.COSINOR,
  graphs: []
}

export interface SetCsvDataParams {
  csvStringData: string
  csvTableData: string[][]
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
      console.log('SET COMMAND', action.payload)
      state.command = action.payload
    },
    setCosinorType (state, action: PayloadAction<CosinorType>) {
      state.cosinorType = action.payload
    },
    setGraphs (state, action: PayloadAction<Graph[]>) {
      state.graphs = action.payload
    },
  },
})

export const {
  setCsvData,
  setCommand,
  setCosinorType,
  setGraphs,
} = optionsSlice.actions

export default optionsSlice.reducer
