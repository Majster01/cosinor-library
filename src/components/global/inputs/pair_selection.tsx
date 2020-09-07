import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { CheckboxInput } from './checkbox_input'
import { Button, InputLabel, FormControl } from '@material-ui/core'
import { useStyles } from './styles'
import { FileType } from '../../../store/options_slice'
import { CSVFile, CSVMeasurements, isNestedArray, getXLSXReplicaCount } from '../../../utils/csv_file_helpers'
import { FitType } from '../../../services/api'
import { WorkBook, WorkSheet } from 'xlsx/types'
import { getXLSXSpan, XLSXSpan, XLSXSheetSpan, range } from '../../data_selection/select_data_table/checkbox_xlsx_table'

const getCSVTestNames = (fitType: FitType, data: CSVMeasurements): string[] => (
  fitType === FitType.POPULATION
    ? Object.keys(data)
    : Object.values(data).reduce<string[]>((names: string[], measurement: string[] | string[][]): string[] => {
    if (!isNestedArray(measurement)) {
      return [...names, (measurement[0] as string)]
    }
    
    return [
      ...names,
      ...(measurement as string[][]).map((data: string[]) => data[0])
    ]
  }, [])
)

const getXLSXTestNames = (fitType: FitType, data: WorkBook): string[] => {
  if (fitType === FitType.POPULATION) {
    return data.SheetNames
  }

  const spans: XLSXSpan = getXLSXSpan(data)

  return data.SheetNames.reduce<string[]>((replicateNames: string[], sheetName: string): string[] => {
    const sheet: WorkSheet =  data.Sheets[sheetName]

    const span: XLSXSheetSpan = spans[sheetName]
    
    const count: number = getXLSXReplicaCount(sheet, span)

    const newReplicateNames: string[] = range(count, 1).map((num: number) => `${sheetName}_rep${num}`)

    return [...replicateNames, ...newReplicateNames]
  }, [])
}

const getNames = (fileType: FileType, fitType: FitType, data: CSVFile | WorkBook): string[] => {
  if (fileType === FileType.CSV) {
    return getCSVTestNames(fitType, (data as CSVFile).measurements)
  }

  return getXLSXTestNames(fitType, data as WorkBook)
}

const isInPairs = (name: string, pairs: Tuple[]) => (
  pairs.some((pair: Tuple) => pair.some((value: string) => value === name))
)

const isSelected = (name: string, selected: string[]) => (
  selected.some((value: string) => value === name)
)

export type Tuple = [string, string]

export interface PairProps {
  pair: Tuple
  onRemove: () => void
}

export const Pair: React.FC<PairProps> = ({ pair, onRemove }: PairProps) => (
  <span>
    {`${pair[0]} - ${pair[1]}`}
    <Button variant='text' color='secondary' onClick={onRemove}>Remove</Button>
  </span>
)

export interface PairSelectionProps {
  label: string
  selectedPairs: Tuple[]
  onSelectedPairsChange: (pairs: Tuple[]) => void
}

export const PairSelection: React.FC<PairSelectionProps> = ({ label, selectedPairs, onSelectedPairsChange}: PairSelectionProps) => {

  const classes = useStyles()

  const fileType: FileType | undefined = useSelector((state: RootState) => state.options.fileType)
  const data: CSVFile | WorkBook | undefined = useSelector((state: RootState) => fileType ? state.options[fileType].selectedData : undefined)

  const fitType: FitType = useSelector((state: RootState) => state.options.fitType)

  const [selectedNames, setSelectedNames] = useState<string[]>([])

  useEffect(() => {
    setSelectedNames([])
  }, [fitType])

  if (fileType === undefined  || data === undefined) {
    return null
  }

  const names: string[] = getNames(fileType, fitType, data)

  const canSelect: boolean = selectedNames.length < 2

  const onCheckboxChange = (name: string) => (value: boolean) => {
    if (value) {
      setSelectedNames((prev: string[]) => [...prev, name])
    } else {
      setSelectedNames((prev: string[]) => prev.filter((selectedName: string) => selectedName !== name))
    }
  }

  const onSelectPair = () => {
    if (selectedNames.length === 2) {
      onSelectedPairsChange([...selectedPairs, (selectedNames as Tuple)])
      setSelectedNames([])
    }
  }

  const onRemovePair = (pair: Tuple) => () => {
    onSelectedPairsChange(selectedPairs.filter((selectedPair: Tuple) => selectedPair !== pair))
  }

  return <FormControl margin='normal' className={classes.pairSelectionContainer}>
    <InputLabel shrink>{label}</InputLabel>
    <div className={classes.content}>
      <div>
        {names.map((name: string) => {
          const isSelectedAsNewPair: boolean = isSelected(name, selectedNames)
          const isSelectedAsOldPair: boolean = isInPairs(name, selectedPairs)
          
          return (
            <CheckboxInput
              key={name}
              label={name}
              value={isSelectedAsNewPair || isSelectedAsOldPair}
              disabled={isSelectedAsOldPair || (!isSelectedAsNewPair && !canSelect)}
              onChange={onCheckboxChange(name)}
            />
          )
        })}
      </div>
      <div className={classes.transferButton}>
        <Button onClick={onSelectPair} color='primary' variant='outlined' disabled={selectedNames.length !== 2}> > </Button>
      </div>
      <div className={classes.pairsContainer}>
        {selectedPairs.map((pair: Tuple) => (
          <Pair pair={pair} onRemove={onRemovePair(pair)} />
        ))}
      </div>
    </div>
  </FormControl>
}