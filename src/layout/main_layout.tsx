import React from 'react'
import { DataSelection } from '../components/data_selection/data_selection'
import { useStyles } from './styles'
import './global_styles.css'
import { AnalysisSelection } from '../components/analysis_selection/analysis_selection'
import { GraphContainer } from '../components/result_display/graph_container'

export const MainLayout: React.FC = () => {

  const classes = useStyles()

  return (
    <div className={classes.backdrop}>
      <div className={classes.container}>
        <DataSelection />
        <AnalysisSelection />
        <GraphContainer />
      </div>
    </div>
  )
}
