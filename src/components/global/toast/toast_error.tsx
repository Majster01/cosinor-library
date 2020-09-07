import React from 'react'
import { Snackbar } from '@material-ui/core'

export interface ToastErrorProps {
  open?: boolean
  onClose: () => void
  message: string
}

export const ToastError: React.FC<ToastErrorProps> = ({ message, open, onClose }: ToastErrorProps) => {

  return <Snackbar
    color='secondary'
    message={message}
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
  />
}
