import React from 'react'
import { useStyles } from './styles'

export const ValidFileTooltips: React.FC = () => {

  const classes = useStyles()

  return (
    <div className={classes.tooltipsContainer}>
      <div>
        Examples for valid files:
      </div>
      <ul>
        <li><a href='https://raw.githubusercontent.com/mfcovington/jtk-cycle/develop/Example2_data.txt'>CSV file</a></li>
        <li><a href='https://github.com/mmoskon/CosinorPy/blob/master/test_data/dependent_data.xlsx'>XLSX file</a></li>
      </ul>
    </div>
  )
}