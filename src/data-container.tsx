import React, { useState } from 'react'
import { Graph, CosinorCommand, CosinorType } from './services/api'
import { SettingsForm } from './options/settings-form'

export type CommandGraphData = {
  [key in CosinorCommand]: CosinorTypeGraphData
}

export type CosinorTypeGraphData = {
  [key in CosinorType]: Graph[]
}


const initCosinorTypeGraphData: CosinorTypeGraphData = {
  [CosinorType.COSINOR]: [],
  [CosinorType.COSINOR1]: [],
}

export const DataContainer: React.FC = () => {
  
  const [command, setCommand] = useState<CosinorCommand>(CosinorCommand.PERIODOGRAM)
  const [cosinorType, setCosinorType] = useState<CosinorType>(CosinorType.COSINOR)

  const [data, setData] = useState<CommandGraphData>({
    [CosinorCommand.PERIODOGRAM]: initCosinorTypeGraphData,
    [CosinorCommand.FIT_GROUP]: initCosinorTypeGraphData,
  })

  const onSubmitCallback = (cosinorCommand: CosinorCommand, cosinorType: CosinorType, cosinorData: Graph[]) => {
    setData((prev) => ({
      ...prev,
      [cosinorCommand]: {
        ...prev[cosinorCommand],
        [cosinorType]: cosinorData
      }
    }))

    console.log('data', cosinorData)
  }

  console.log('DATA', data.periodogram["general cosinor"])

  return <div>
    <SettingsForm onSubmitCallback={onSubmitCallback} onCommandChange={setCommand} onCosinorTypeChange={setCosinorType} />
    { data[command][cosinorType].map((graph: Graph) => <img src={`data:image/png;base64,${graph.data}`} alt='graph' />) }
  </div>
}