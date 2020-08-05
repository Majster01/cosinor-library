import React from 'react'

import { useStyles } from "./styles";
import { TableHead, TableRow, TableCell, Checkbox } from "@material-ui/core";

interface EnhancedTableRowProps {
  onSelect(i: number): void
  isSelected?: boolean
  values: string[]
  id: number
  key: string | number
  cellsCount: number
}

export const EnhancedTableRow: React.FC<EnhancedTableRowProps> = (props: EnhancedTableRowProps) => {
  const classes = useStyles()
  const { id, onSelect, isSelected, values, key, cellsCount } = props

  if (values.length !== cellsCount) {
    return null
  }

  return (
    <TableRow
      className={classes.row}
      hover
      onClick={(event) => onSelect(id)}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={-1}
      key={key}
      selected={isSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox
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