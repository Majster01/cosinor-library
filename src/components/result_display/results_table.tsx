import React from 'react'
import { ResultsContainerProps } from './result_display'
import { TableHead, Table, TableRow, TableCell, TableBody } from '@material-ui/core'
import { parse } from 'papaparse'

export const ResultsTable: React.FC<ResultsContainerProps> = (props: ResultsContainerProps) => {
  
  if (props.resultsData?.data === undefined || props.resultsData.data === null || props.resultsData.data.length === 0) {
    return <span>No data</span>
  }

  const dataFrame: string[][] = parse<string[]>(props.resultsData.data).data

  const [header, ...rest] = dataFrame
  
  return <Table>
    <TableHead>
      <TableRow>
        { header.map((cell: string) => (
          <TableCell>
            {cell}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      { rest.map((row: string[]) => (
        <TableRow>
          { row.map((cell: string) => (
            <TableCell>
              {cell}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
}