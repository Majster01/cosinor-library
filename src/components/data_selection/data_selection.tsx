import React from 'react'
import { GenerateTestDataOptions } from './generate_data/generate_data_form'
import { CheckboxTable } from './select_data_table/checkbox_table'
import { UploadDataForm } from './upload_data/upload_data_form'
import { useStyles } from './styles'
import { Button } from '@material-ui/core'
import { FileType } from '../../store/options_slice'
import { useSelector } from 'react-redux'
import { FlowStepperState, useFlowStepperContext } from '../global/stepper/flow_stepper_context'
import { RootState } from '../../store/store'
import { CheckboxXLSXTable } from './select_data_table/checkbox_xlsx_table'

export const DataSelection: React.FC = () => {

  const classes = useStyles()
  
  const fileType: FileType | undefined = useSelector((state: RootState) => state.options.fileType)
  const dataIsSelected: boolean = useSelector((state: RootState) => fileType
    ? state.options[fileType].data !== undefined && state.options[fileType].selectedData !== undefined
    : false
  )

  console.log('fileType', fileType)
  console.log('dataIsSelected', dataIsSelected)

  const flowStepperContext: FlowStepperState = useFlowStepperContext()

  return (
    <div className={classes.dataSelectionWrapper}>
      <div className={classes.header}>Generate or upload data for analysis</div>
      <div className={classes.dataSelectionFormWrapper}>
        <GenerateTestDataOptions />
        <UploadDataForm />
      </div>
      {fileType === FileType.CSV && dataIsSelected && <CheckboxTable />}
      {fileType === FileType.XLSX && dataIsSelected && <CheckboxXLSXTable />}
      <div className={classes.controlButton}>
        <Button color='primary' variant='contained' disabled={!dataIsSelected} onClick={flowStepperContext.stepNavigationNext}>Continue</Button>
      </div>
    </div>
  )
}
