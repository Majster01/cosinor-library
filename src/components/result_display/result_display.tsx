import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { PythonResponse } from '../../services/api'
import { AppBar, Tab, Tabs } from '@material-ui/core'
import { GraphContainer } from './graph_container'
import { ResultsTable } from './results_table'
import { useResultsStyles } from './styles'
import { ExportDataButton } from './export_data_button'

export interface ResultsContainerProps {
  resultsData?: PythonResponse
  tableData?: string[][]
}

const TabsConfig: React.FC<ResultsContainerProps>[] = [
  GraphContainer,
  ResultsTable,
]

export const ResultDisplay = () => {
  const [value, setValue] = React.useState(0);

  const classes = useResultsStyles()

  const pythonResponse: PythonResponse | undefined = useSelector((state: RootState) => state.options.responseData)

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  }

  const OpenedTab: React.FC<ResultsContainerProps> = TabsConfig[value]

  
  if (pythonResponse === undefined || pythonResponse === null) {
    return null
  }
  
  const showResultsTable: boolean = pythonResponse.data !== null

  return (
    <div className={classes.resultDisplayContainer}>
      <AppBar className={classes.appBar} position="static">
        <Tabs value={value} onChange={handleChange} centered aria-label="simple tabs example">
          <Tab label="Graphs" />
          { showResultsTable && <Tab label="Result data" />}
        </Tabs>
        { showResultsTable && <ExportDataButton />}
      </AppBar>
      <div className={classes.tabContent}>
        <OpenedTab resultsData={pythonResponse} />
      </div>
    </div>
  )
}