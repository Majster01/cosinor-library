import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { DataFramePoint } from './services/api';
import { ScatterSeries } from '@devexpress/dx-react-chart';

export interface ChartGraphProps {
  data: any[]
}

const mapToChartData = (name: string | number, line: DataFramePoint[]) => (
  line.map((point: DataFramePoint) => ({
    [`${name}X`]:  point.x,
    [`${name}Y`]:  point.y
  }))
)

const mapToLineSeries = (array: any[]) => (
  array.map((_data, i: number) => (
    <LineSeries key={i} valueField={`${i}Y`} argumentField={`${i}X`} />
  ))
)

const mapToScatterSeries = (array: any[]) => (
  array.map((_data, i: number) => (
    <ScatterSeries key={i} valueField={`${i}Y`} argumentField={`${i}X`} />
  ))
)

export const ChartGraph: React.FC<ChartGraphProps> = (props: ChartGraphProps) => {
  console.log(props.data)

  let xyData = props.data.flatMap((line: DataFramePoint[], i: number) => (
    mapToChartData(i, line)
  ))
  
  return (
    <Paper>
      <Chart
        data={xyData}
      >
        <ArgumentAxis />
        <ValueAxis />

        { mapToLineSeries(props.data) }
        { mapToScatterSeries(props.data) }
      </Chart>
    </Paper>
  );
}
