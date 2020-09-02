import React, { useState } from 'react'
import { ButtonProps, Button, CircularProgress } from '@material-ui/core'
import { useStyles } from './styles'

export interface LoadingButtonProps extends Omit<ButtonProps, 'onClick'> {
  onClick: () => Promise<void>
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({ onClick, children, disabled, ...props }: LoadingButtonProps) => {

  const classes = useStyles()

  const [loading, setLoading] = useState<boolean>(false)

  const handleOnClick = async () => {
    setLoading(true)
    try {
      await onClick()
    } catch (err) {
      console.log('error')
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