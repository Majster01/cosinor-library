import React, { useState } from 'react'
import { Graph, CosinorCommand } from './services/api'
import { SettingsForm } from './options/settings-form'

export type CommandGraphData = {
  [key in CosinorCommand]: Graph[]
}

export const DataContainer: React.FC = () => {
  
  const [command, setCommand] = useState<CosinorCommand>(CosinorCommand.PERIODOGRAM)

  const [data, setData] = useState<CommandGraphData>({
    [CosinorCommand.PERIODOGRAM]: [],
    [CosinorCommand.FIT_GROUP]: [],
  })

  const onSubmitCallback = (cosinorCommand: CosinorCommand, cosinorData: Graph[]) => {
    setData((prev) => ({
      ...prev,
      [cosinorCommand]: cosinorData
    }))

    console.log('data', cosinorData)
  }

  const onCommandChange = (cosinorCommand: CosinorCommand) => {
    setCommand(cosinorCommand)
  }

  return <div>
    <SettingsForm onSubmitCallback={onSubmitCallback} onCommandChange={onCommandChange} />
    { data[command].map((graph: Graph) => <img src={`data:image/png;base64,${graph.data}`} alt='graph' />) }
  </div>
}