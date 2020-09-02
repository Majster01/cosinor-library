import React from 'react'
import { useStyles } from './styles'
import { ResultsContainerProps } from './result_display'

export const GraphContainer: React.FC<ResultsContainerProps> = (props: ResultsContainerProps) => {
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        { props.resultsData !== undefined && props.resultsData.graphs.map((graph: string) => <img src={`data:image/png;base64,${graph}`} alt='graph' />) }
      </div>
    </div>
  )
}