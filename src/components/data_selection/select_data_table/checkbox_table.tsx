import React from 'react'
import { Table, TableBody } from "@material-ui/core"
import { EnhancedTableHead } from './table_head'
import { EnhancedTableRow } from './table_row'
import { useStyles } from './styles'
import { RootState } from '../../../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { DataFileMeta, setCSVMetaData, FileType } from '../../../store/options_slice'
import { unparse } from 'papaparse'

export const CheckboxTable: React.FC = () => {
  const classes = useStyles()


  const dispatch = useDispatch()

  const fileData: DataFileMeta<string[][], string> = useSelector((state: RootState) => state.options[FileType.CSV])

  if (fileData.data === undefined || fileData.selectedData === undefined) {
    return null
  }

  const {
    data,
    selectedData,
  } = fileData

  const rowCount: number = data.length
  const [headerData, ...tableRows]: string[][] = data
  const cellCount: number = headerData.length

  const onSelectAllClick = () => {
    const allRowsAreSelected = tableRows.every((row: string[]) => selectedData.includes(row))

    if (allRowsAreSelected) {
      const selected: string[][] = [data[0]]

      dispatch(setCSVMetaData({
        selectedData: selected,
      }))
    } else {
      dispatch(setCSVMetaData({
        selectedData: data,
      }))
    }
  }

  const onSelect = (row: string[]) => {
    const isSelected = checkIsSelected(row)

    if (!isSelected) {
      console.log('NOT SELECTED', selectedData, data)
      const selected: string[][] = data.reduce((selectedRows: string[][], currentRow: string[]) => {
        console.log('row is selected', checkIsSelected(currentRow), currentRow)
        if (currentRow === row || checkIsSelected(currentRow)) {
          return [...selectedRows, currentRow]
        }

        return selectedRows
      }, [data[0]])

      const selectedFile: string = unparse(selected, { delimiter: '\t'})


      dispatch(setCSVMetaData({
        selectedData: selected,
        file: selectedFile,
      }))
    } else {
      const selected: string[][] = selectedData.filter((currentRow: string[]) => currentRow !== row)
      
      const selectedFile: string = unparse(selected, { delimiter: '\t'})

      dispatch(setCSVMetaData({
        selectedData: selected,
        file: selectedFile,
      }))
    }
  }

  const checkIsSelected = (row: string[]) => selectedData.includes(row)

  return (
    <div className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <EnhancedTableHead
          headerData={headerData}
          rowCount={rowCount}
          numSelected={selectedData.length}
          onSelectAllClick={onSelectAllClick}
        />
        <TableBody className={classes.tableBody}>
          {tableRows.map((rowData: string[], i: number) => (
            <EnhancedTableRow
              key={i}
              isSelected={checkIsSelected(rowData)}
              onSelect={onSelect}
              values={rowData}
              cellsCount={cellCount}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}