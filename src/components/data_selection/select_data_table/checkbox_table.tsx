import React, { useState } from 'react'
import { Table, TableBody } from "@material-ui/core"
import { EnhancedTableHead } from './table_head'
import { EnhancedTableRow } from './table_row'
import { useStyles } from './styles'

export interface CheckboxTableProps {
  data: string[][]
  onSelectCallback(selectedRows: number[]): void
}

export const CheckboxTable: React.FC<CheckboxTableProps> = (props: CheckboxTableProps) => {
  const classes = useStyles()

  const {
    data,
    onSelectCallback
  } = props

  const rowCount: number = data.length
  const [headerData, ...tableRows]: string[][] = data
  const cellCount: number = headerData.length

  const [selectedRows, setSelectedRows] = useState<number[]>([0])

  const onSelectAllClick = () => {
    const allRowsAreSelected = tableRows.every((_row: string[], i: number) => selectedRows.includes(i))

    if (allRowsAreSelected) {
      const selected: number[] = [0]
      setSelectedRows(selected)
      onSelectCallback(selected)
    } else {
      const selected: number[] = tableRows.map((_data, i: number) => i)
      setSelectedRows(selected)
      onSelectCallback(selected)
    }
  }

  const onSelect = (i: number) => {
    console.log('onSelect', i)
    const isSelected = checkIsSelected(i)

    if (!isSelected) {
      const selected: number[] = [...selectedRows, i]
      setSelectedRows(selected)
      onSelectCallback(selected)
    } else {
      const selected: number[] = selectedRows.filter((selectedRow: number) => selectedRow !== i)
      setSelectedRows(selected)
      onSelectCallback(selected)
    }
  }

  const checkIsSelected = (i: number) => selectedRows.includes(i)

  return (
    <div className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <EnhancedTableHead
          headerData={headerData}
          rowCount={rowCount}
          numSelected={selectedRows.length}
          onSelectAllClick={onSelectAllClick}
        />
        <TableBody className={classes.tableBody}>
          {tableRows.map((rowData: string[], i: number) => (
            <EnhancedTableRow
              id={i + 1}
              key={i}
              isSelected={checkIsSelected(i + 1)}
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