import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ToastSlice {
  open: boolean
  message: string
}


const initialState: ToastSlice = {
  open: false,
  message: ''
}

const toastSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setOpen (state, action: PayloadAction<boolean>) {
      state.open = action.payload
    },
    openToastError (state, action: PayloadAction<string>) {
      state.open = true
      state.message = action.payload
    },
  },
})

export const {
  setOpen,
  openToastError,
} = toastSlice.actions

export default toastSlice.reducer
