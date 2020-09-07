import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store/store'
import { ToastError } from './toast_error'
import { setOpen } from '../../../store/toast_slice'

export const ToastHandler: React.FC = () => {

  const dispatch = useDispatch()

  const open: boolean = useSelector((state: RootState) => state.toast.open)
  const message: string = useSelector((state: RootState) => state.toast.message)

  const onClose = () => {
    dispatch(setOpen(false))
  }

  return <ToastError
    message={message}
    open={open}
    onClose={onClose}
  />
}
