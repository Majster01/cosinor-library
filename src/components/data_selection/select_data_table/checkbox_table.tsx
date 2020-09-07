import React from 'react'
import { Table, TableBody } from "@material-ui/core"
import { EnhancedTableHead } from './table_head'
import { EnhancedTableRow } from './table_row'
import { useStyles } from './styles'
import { RootState } from '../../../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { DataFileMeta, setCSVMetaData, FileType } from '../../../store/options_slice'
import { CSVFile, CSVMeasurements, addCSVMeasurement, removeCSVMeasurement } from '../../../utils/csv_file_helpers'

export const CheckboxTable: React.FC = () => {
  const classes = useStyles()


  const dispatch = useDispatch()

  const fileData: DataFileMeta<CSVFile> = useSelector((state: RootState) => state.options[FileType.CSV])

  if (fileData.data === undefined || fileData.selectedData === undefined) {
    return null
  }

  const {
    data,
    selectedData,
  } = fileData

  const {
    header,
    measurements,
  }: CSVFile = data

  const {
    measurements: selectedMeasurements,
  }: CSVFile = selectedData
  
  const cellCount: number = header.length
  const rowCount: number = Object.keys(measurements).length

  const onSelectAllClick = () => {
    const allRowsAreSelected = Object.keys(measurements).every(checkIsSelected)

    if (allRowsAreSelected) {

      const selectedFile: CSVFile = {
        header,
        measurements: {}
      }

      dispatch(setCSVMetaData({
        selectedData: selectedFile,
      }))
    } else {
      dispatch(setCSVMetaData({
        selectedData: data,
      }))
    }
  }

  const onSelect = (key: string) => {
    const isSelected = checkIsSelected(key)
    
    if (!isSelected) {
      
      const selected: CSVMeasurements = addCSVMeasurement(key, measurements[key], selectedMeasurements)

      dispatch(setCSVMetaData({
        selectedData: ({
          header,
          measurements: selected
        }),
      }))
    } else {

      const selected: CSVMeasurements = removeCSVMeasurement(key, selectedMeasurements)

      dispatch(setCSVMetaData({
        selectedData: ({
          header,
          measurements: selected
        }),
      }))
    }
  }

  const checkIsSelected = (key: string) => selectedMeasurements[key] !== undefined && selectedMeasurements[key].length > 0

  return (
    <div className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <EnhancedTableHead
          headerData={header}
          rowCount={rowCount}
          numSelected={Object.keys(selectedMeasurements).length}
          onSelectAllClick={onSelectAllClick}
        />
        <TableBody className={classes.tableBody}>
          {Object.keys(measurements).map((key: string) => (
            <EnhancedTableRow
              measurementKey={key}
              isSelected={checkIsSelected(key)}
              onSelect={onSelect}
              values={measurements[key]}
              cellsCount={cellCount}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}