import React, { useState } from 'react'
import { ButtonProps, Button, CircularProgress } from '@material-ui/core'
import { useStyles } from './styles'
import { useDispatch } from 'react-redux'
import { openToastError } from '../../../store/toast_slice'

export interface LoadingButtonProps extends Omit<ButtonProps, 'onClick'> {
  onClick: () => Promise<void>
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({ onClick, children, disabled, ...props }: LoadingButtonProps) => {

  const classes = useStyles()

  const dispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(false)

  const handleOnClick = async () => {
    setLoading(true)
    try {
      await onClick()
    } catch (err) {
      dispatch(openToastError('Unexpected error occured. Please check your selected data and try again'))
      console.error('error', err)
    }
    setLoading(false)
  }

  return (
    <Button
      color='primary'
      variant='contained'
      {...props}
      className={classes.buttonContainer}
      disabled={disabled || loading}
      onClick={handleOnClick}
    >
      {children}
      {loading && <div className={classes.loadingContainer}>
        <CircularProgress size='1rem' color='primary' />
      </div>}
    </Button>
  )
}