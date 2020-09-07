import React from 'react'
import { useStyles } from './styles'
import { WorkBook, Sheet, WorkSheet } from 'xlsx/types'
import { FileType, DataFileMeta, setXLSXMetaData } from '../../../store/options_slice'
import { RootState } from '../../../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { Checkbox, Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core'
import { cloneObject } from '../../../utils/csv_file_helpers'

export interface XLSXSheetSpan {
  rows: string[],
  columns: number[]
}

export interface XLSXSpan {
  [key: string]: XLSXSheetSpan
}

export const range = (size: number, startAt: number): number[] => {
  const arr: IterableIterator<number> = Array(size).keys()

  return [...arr].map(i => i + startAt);
}

const getLetterRange = (from: string, to: string) => {
  const fromChar: number = from.charCodeAt(0)
  const toChar: number = to.charCodeAt(0)

  const size: number = toChar - fromChar + 1

  const letterRange = range(size, fromChar)

  return letterRange.map((value: number) => String.fromCharCode(value))
}
const XLSXStartRegex: RegExp = /^(.*):.*$/
const XLSXEndRegex: RegExp = /^.*:(.*)$/

const XLSXLetterRegex: RegExp = /^([A-Z]{1})\d+$/
const XLSXNumberRegex: RegExp = /^[A-Z]{1}(\d+)$/

export const getXLSXSpan = (workbook: WorkBook): XLSXSpan => {
  const sheetNames: string[] = workbook.SheetNames

  return sheetNames.reduce((xlsxSpan: XLSXSpan, sheetName: string): XLSXSpan => {
    const sheet: Sheet = workbook.Sheets[sheetName]

    const spanRef: string | undefined = sheet['!ref']
  
    if (spanRef === undefined) {
      throw new Error('ERR_INVALID_XLSX_FILE')
    }

    const start: string = spanRef.replace(XLSXStartRegex, (_value: string, capture: string) => capture)
    const end: string = spanRef.replace(XLSXEndRegex, (_value: string, capture: string) => capture)

    const startLetter: string = start.replace(XLSXLetterRegex, (_value: string, capture: string) => capture)
    const startNumber: number = Number(start.replace(XLSXNumberRegex, (_value: string, capture: string) => capture))
    const endLetter: string = end.replace(XLSXLetterRegex, (_value: string, capture: string) => capture)
    const endNumber: number = Number(end.replace(XLSXNumberRegex, (_value: string, capture: string) => capture))

    const numberSize: number = endNumber - startNumber + 1

    const letterRange: string[] = getLetterRange(startLetter, endLetter)
    const numberRange: number[] = range(numberSize, startNumber)

    return {
      ...xlsxSpan,
      [sheetName]: {
        rows: letterRange,
        columns: numberRange
      }
    }
  }, {})
}

export const CheckboxXLSXTable: React.FC = () => {
  const classes = useStyles()

  const fileData: DataFileMeta<WorkBook> = useSelector((state: RootState) => state.options[FileType.XLSX])
  
  const dispatch = useDispatch()

  if (fileData.data === undefined || fileData.selectedData === undefined) {
    return null
  }

  const {
    data,
    selectedData,
  } = fileData

  const spans = getXLSXSpan(data)

  const sheetNames: string[] = data.SheetNames

  const onSelect = (key: string) => {
    const isSelected = checkIsSelected(key)

    if (!isSelected) {
      const sheets: WorkSheet = {
        ...selectedData.Sheets,
        [key]: data.Sheets[key],
      }

      const sheetNames: string[] = data.SheetNames.filter((sheetName: string) => sheetName === key || checkIsSelected(sheetName))
      
      dispatch(setXLSXMetaData({
        selectedData: cloneObject({
          ...selectedData,
          Sheets: sheets,
          SheetNames: sheetNames
        }),
      }))
    } else {
      const sheets: WorkSheet = {...selectedData.Sheets}

      delete sheets[key]
      const sheetNames: string[] = selectedData.SheetNames.filter((sheetName: string) => sheetName !== key)
      
      dispatch(setXLSXMetaData({
        selectedData: cloneObject({
          ...selectedData,
          Sheets: sheets,
          SheetNames: sheetNames
        }),
      }))
    }
  }

  const checkIsSelected = (key: string) => selectedData.SheetNames.includes(key)

  return (
    <div className={classes.root}>
      {sheetNames.map((sheetName: string) => {
        const isSelected: boolean = checkIsSelected(sheetName)

        const sheet: WorkSheet = data.Sheets[sheetName]
        const sheetSpan: XLSXSheetSpan = spans[sheetName]

        const [header, ...body] = sheetSpan.rows
        const rows: number[] = sheetSpan.columns
      
        return <div className={classes.xlsxRow} onClick={(e) => onSelect(sheetName)}>
          <div className={classes.paddingNormal}>
            <Checkbox
              color='primary'
              checked={isSelected}
            />      
          </div>
          <div className={classes.paddingNormal}>
            {sheetName}
          </div>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              {rows.map((rowNumber: number) => <TableCell padding={'default'}>
                {sheet[`${header}${rowNumber}`].w}
              </TableCell>)}
            </TableHead>
            <TableBody className={classes.tableBody}>
              {body.map((bodyRow: string) => (
                <TableRow>
                  {rows.map((rowNumber: number) => <TableCell>
                    {sheet[`${bodyRow}${rowNumber}`].w}
                  </TableCell>)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      })}
    </div>
  )
}