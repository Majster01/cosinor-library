import React, { useState } from 'react'
import { AnalysisOptions } from './generate_data/generate_data_form'
import { CheckboxTable } from './select_data_table/checkbox_table'
import { UploadDataForm } from './upload_data/upload_data_form'
import { useStyles } from './styles'
import { Button } from '@material-ui/core'
import { setCsvData } from '../../store/options_slice'
import { useDispatch } from 'react-redux'
import { unparse } from 'papaparse'

export const DataSelection: React.FC = () => {

  const classes = useStyles()
  
  const [data, setData] = useState<string[][] | null>(null)
  const [selectedData, setSelectedData] = useState<string[][] | null>(null)

  const dispatch = useDispatch()

  const onDataCallback = (newData: string[][]) => {
    setData(newData)
    setSelectedData(newData)
  }

  const onSelectCallback = (selectedDataKeys: number[]) => {
    if (data !== null) {
      console.log('onSelectCallback')
      const newSelectedData = selectedDataKeys.map((key: number) => data[key])
  
      setSelectedData(newSelectedData)
    }
  }

  console.log('selectedData', selectedData)

  const onSubmitDataSelection = () => {

    if (selectedData !== null) {
      const csvStringData: string = unparse(selectedData, { delimiter: '\t'})

      dispatch(setCsvData({
        csvStringData,
        csvTableData: selectedData
      }))
    }
  }

  return (
    <div className={classes.dataSelectionWrapper}>
      <div className={classes.header}>Select data for analysis</div>
      <div className={classes.dataSelectionFormWrapper}>
        <AnalysisOptions onDataCallback={onDataCallback} />
        <UploadDataForm onDataCallback={onDataCallback} />
      </div>
      {data && <CheckboxTable data={data} onSelectCallback={onSelectCallback} />}
      <div>
        <Button disabled={selectedData === null} onClick={onSubmitDataSelection}>Continue</Button>
      </div>
    </div>
  )
}
