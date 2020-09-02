import React from 'react'

import { useStyles } from "./styles";
import { TableRow, TableCell, Checkbox } from "@material-ui/core";

interface EnhancedTableRowProps {
  onSelect(row: string[]): void
  isSelected?: boolean
  values: string[]
  key: string | number
  cellsCount: number
}

export const EnhancedTableRow: React.FC<EnhancedTableRowProps> = (props: EnhancedTableRowProps) => {
  const classes = useStyles()
  const {  onSelect, isSelected, values, key, cellsCount } = props

  if (values.length !== cellsCount) {
    return null
  }

  return (
    <TableRow
      className={classes.row}
      hover
      onClick={(event) => onSelect(values)}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={-1}
      key={key}
      selected={isSelected}
      classes={{
        selected: classes.selectedRow
      }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color='primary'
          checked={isSelected}
        />
      </TableCell>
      
      {values.map((value: string, i: number) => (
        i === 0
          ? <TableCell className={i === 0 ? classes.nameCell : classes.cell} component="th" scope="row">{value}</TableCell>
          : <TableCell className={i === 0 ? classes.nameCell : classes.cell} align='right'>{value}</TableCell>
      ))}
    </TableRow>
  );
}