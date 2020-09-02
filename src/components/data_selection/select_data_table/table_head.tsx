import React from 'react'

import { useStyles } from "./styles";
import { TableHead, TableRow, TableCell, Checkbox } from "@material-ui/core";

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  rowCount: number;
  headerData: string[]
}

export const EnhancedTableHead = (props: EnhancedTableProps) => {
  const classes = useStyles()
  const {onSelectAllClick, numSelected, rowCount, headerData } = props;

  console.log(numSelected, rowCount)

  return (
    <TableHead>
      <TableRow className={classes.header}>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 1 && numSelected < rowCount}
            color='primary'
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headerData.map((data, i) => (
          <TableCell
            key={i}
            align={i === 0 ? 'left' : 'right'}
            padding={'default'}
          >
            {data}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}