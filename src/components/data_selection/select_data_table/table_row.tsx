import React, { MouseEvent } from 'react'

import { useStyles } from "./styles";
import { TableRow, TableCell, Checkbox, TableRowProps } from "@material-ui/core";
import { isNestedArray } from '../../../utils/csv_file_helpers'

interface EnhancedTableRowProps {
  onSelect(key: string): void
  isSelected?: boolean
  values: string[] | string[][]
  measurementKey: string
  cellsCount: number
}

const getRowCells = (rowData: string[], cellStyle: string) => {
  const [, ...rest] = rowData
  
  return (
    rest.map((value: string, i: number) => <TableCell className={cellStyle} align='right'>{value}</TableCell>)
  )
}

const getNestedRowCells = (
  nestedRowData: string[][],
  titleComponents: JSX.Element[],
  tableRowProps: TableRowProps,
  cellStyle: string
) => (
  nestedRowData.map((rowData: string[], i: number) => {

    const [, ...rest] = rowData

    const rowElements: JSX.Element[] = rest.map((value: string) => <TableCell className={cellStyle} align='right'>{value}</TableCell>)

    const rowElementsWithTitle: JSX.Element[] = i === 0
      ? [...titleComponents, ...rowElements]
      : rowElements

    return <TableRow {...tableRowProps}>
      {rowElementsWithTitle}
    </TableRow>
  })
)

const getTitleCellRowSpan = (isNested: boolean, values: string[] | string[][]) => !isNested
  ? 1
  : values.length

export const EnhancedTableRow: React.FC<EnhancedTableRowProps> = (props: EnhancedTableRowProps) => {
  const classes = useStyles()
  const {  onSelect, isSelected, values, measurementKey, cellsCount } = props

  const isNested: boolean = isNestedArray(values)

  if (!isNested && values.length !== cellsCount) {
    return null
  }

  const rowSpan = getTitleCellRowSpan(isNested, values)
  
  const checkboxElement: JSX.Element = <TableCell padding="checkbox" rowSpan={rowSpan}>
    <Checkbox
      color='primary'
      checked={isSelected}
    />
  </TableCell>

  const titleElement: JSX.Element = <TableCell className={classes.nameCell} component="th" rowSpan={rowSpan} scope="row">
    {measurementKey}
  </TableCell>

  const onRowSelect = (_event: React.MouseEvent<Element>) => onSelect(measurementKey)

  const tableRowProps: TableRowProps = {
    className: `${classes.row} ${measurementKey}`,
    onClick: onRowSelect,
    role: 'checkbox',
    "aria-checked": isSelected,
    tabIndex: -1,
    key: measurementKey,
    selected: isSelected,
    classes: {
      selected: classes.selectedRow,
    }
  }

  if (isNested) {
    return <>
      {getNestedRowCells(values as string[][], [checkboxElement, titleElement], tableRowProps, classes.cell)}
    </>
  }

  return (
    <TableRow {...tableRowProps}>
      {checkboxElement}
      {titleElement}
      {getRowCells(values as string[], classes.cell)}
    </TableRow>
  );
}