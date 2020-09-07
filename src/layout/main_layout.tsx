import React from 'react'
import { useStyles } from './styles'
import './global_styles.css'
import { FlowStepper } from '../components/global/stepper/flow_stepper'
import { ToastHandler } from '../components/global/toast/toast_handler'

export const MainLayout: React.FC = () => {

  const classes = useStyles()

  return (
    <div className={classes.paper}>
      <div className={classes.container}>
        <FlowStepper />
        <ToastHandler />
      </div>
    </div>
  )
}
