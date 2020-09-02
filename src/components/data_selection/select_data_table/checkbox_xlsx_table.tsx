import React from 'react'
// import { Table, TableBody } from "@material-ui/core"
// import { EnhancedTableHead } from './table_head'
// import { EnhancedTableRow } from './table_row'
// import { useStyles } from './styles'
import { WorkBook } from 'xlsx/types'
import { FileType, DataFileMeta } from '../../../store/options_slice'
import { RootState } from '../../../store/store'
import { useSelector } from 'react-redux'


export const CheckboxXLSXTable: React.FC = () => {
  // const classes = useStyles()

  const fileData: DataFileMeta<WorkBook, string> = useSelector((state: RootState) => state.options[FileType.XLSX])

  if (fileData.data === undefined || fileData.selectedData === undefined) {
    return null
  }

  return null

  // const {
  //   data,
  //   selectedData,
  // } = fileData

  // const rowCount: number = data.SheetNames.length
  // const [headerData, ...tableRows]: string[][] = data
  // const cellCount: number = headerData.length

  // const onSelectAllClick = () => {
  //   const allRowsAreSelected = tableRows.every((_row: string[], i: number) => selectedRows.includes(i))

  //   if (allRowsAreSelected) {
  //     const selected: number[] = [0]
  //     setSelectedRows(selected)
  //     onSelectCallback(selected)
  //   } else {
  //     const selected: number[] = tableRows.map((_data, i: number) => i)
  //     setSelectedRows(selected)
  //     onSelectCallback(selected)
  //   }
  // }

  // const onSelect = (i: number) => {
  //   const isSelected = checkIsSelected(i)

  //   if (!isSelected) {
  //     const selected: number[] = [...selectedRows, i]
  //     setSelectedRows(selected)
  //     onSelectCallback(selected)
  //   } else {
  //     const selected: number[] = selectedRows.filter((selectedRow: number) => selectedRow !== i)
  //     setSelectedRows(selected)
  //     onSelectCallback(selected)
  //   }
  // }

  // const checkIsSelected = (i: number) => selectedRows.includes(i)

  // return (
  //   <div className={classes.root}>
  //     <Table className={classes.table} aria-label="simple table">
  //       <EnhancedTableHead
  //         headerData={headerData}
  //         rowCount={rowCount}
  //         numSelected={selectedRows.length}
  //         onSelectAllClick={onSelectAllClick}
  //       />
  //       <TableBody className={classes.tableBody}>
  //         {tableRows.map((rowData: string[], i: number) => (
  //           <EnhancedTableRow
  //             id={i + 1}
  //             key={i}
  //             isSelected={checkIsSelected(i + 1)}
  //             onSelect={onSelect}
  //             values={rowData}
  //             cellsCount={cellCount}
  //           />
  //         ))}
  //       </TableBody>
  //     </Table>
  //   </div>
  // )
}