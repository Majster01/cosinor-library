import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Graph } from '../../services/api'

export const GraphContainer = () => {
  const graphs: Graph[] = useSelector((state: RootState) => state.options.graphs)

  return (
    <div>
      { graphs.map((graph: Graph) => <img src={`data:image/png;base64,${graph.data}`} alt='graph' />) }
    </div>
  )
}