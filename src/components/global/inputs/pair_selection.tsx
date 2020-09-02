import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { CheckboxInput } from './checkbox_input'
import { Button, InputLabel, FormControl } from '@material-ui/core'
import { useStyles } from './styles'
import { FileType } from '../../../store/options_slice'

const getTestNames = (data: string[][]): string[] => {
  const [, ...rest] = data

  return rest.reduce((list: string[], row: string[]) => {
    if (row[0] !== '') {
      return [...list, row[0]]
    }

    return list
  }, [])
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
  const data: string[][] | undefined = useSelector((state: RootState) => fileType ? state.options[FileType.CSV].selectedData : undefined)

  const [selectedNames, setSelectedNames] = useState<string[]>([])

  if (data === undefined) {
    return null
  }

  const names: string[] = getTestNames(data)

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