declare module 'react-csv-to-table' {

  interface CsvToHtmlTableProps {
    data: string
    hasHeader?: boolean
    csvDelimeter?: string
    tableClassName?: string
    tableRowClassName?: string
    tableColumnClassName?: string
    rowKey?: string
    colKey?: string
  }

  export const CsvToHtmlTable: React.FC<CsvToHtmlTableProps>
}
