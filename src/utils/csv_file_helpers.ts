import { DataFileMeta, FileType, setCSVMetaData, setFileType, setXLSXMetaData } from "../store/options_slice"
import * as XLSX from 'xlsx'
import { ParseResult, parse, unparse } from "papaparse"
import { Dispatch } from "redux"
import { XLSXSpan, getXLSXSpan, XLSXSheetSpan } from "../components/data_selection/select_data_table/checkbox_xlsx_table"
require('fs')

export interface CSVMeasurementsWithReplicates {
  data: string[][]
}

export type CSVMeasurements = {
  [key: string]: string[][] | string[]
}

export interface CSVFile {
  header: string[],
  measurements: CSVMeasurements
}

const REPLICATE_REGEX: RegExp = /(.*)_rep\d+/
export const isReplicate = (measurement: string[]): boolean => REPLICATE_REGEX.test(measurement[0])

export const getCSVMeasurements = (data: string[][]): CSVMeasurements => (
  data.reduce<CSVMeasurements>((measurements: CSVMeasurements, measurement: string[]) => {
    if (measurement.length === 0 || measurement[0].length === 0) {
      return measurements
    }

    if (!isReplicate(measurement)) {
      if (measurements[measurement[0]] !== undefined) {
        throw new Error('ERR_DUPLICATE_MEASUREMENT')
      }

      return {
        ...measurements,
        [measurement[0]]: measurement
      }
    }

    const measurementName: string = measurement[0].replace(REPLICATE_REGEX, (_value: string, capture: string) => capture)

    if (isNestedArray(measurements[measurementName])) {
      return {
        ...measurements,
        [measurementName]: [
          ...measurements[measurementName] as string[][],
          measurement
        ]
      }
    }

    return {
      ...measurements,
      [measurementName]: [
        measurement
      ]
    }
  }, {})
)

export const getCSVFile = (data: string[][]): CSVFile => {

  const [header, ...rest] = data

  const measurements = getCSVMeasurements(rest)

  return {
    header,
    measurements
  }
}

export const CSVFileToString = (csvFile: CSVFile): string => {

  const {
    header,
    measurements,
  } = csvFile

  return CSVMeasurementsToCSV(header, measurements)
}

export const addCSVMeasurement = (key: string, value: string[] | string[][], measurements: CSVMeasurements): CSVMeasurements => ({
  ...measurements,
  [key]: value,
})

export const removeCSVMeasurement = (key: string, measurements: CSVMeasurements): CSVMeasurements => {
  const selectedMeasurements: CSVMeasurements = {...measurements}

  delete selectedMeasurements[key]

  return selectedMeasurements
}

export const isNestedArray = (array: string[][] | string[] | undefined): boolean => {
  if (array === undefined || array.length === 0) {
    return false
  }

  const nestedArrayType: string = typeof array[0]

  return nestedArrayType === 'object'
}

export const CSVMeasurementsToCSV = (header: string[], measurements: CSVMeasurements): string => {
  const CSVData: string[][] = Object.values(measurements).reduce<string[][]>((data: string[][], measurements: string[] | string[][]) => {
    const isNested: boolean = isNestedArray(measurements)

    if (!isNested) {
      return [
        ...data,
        measurements as string[]
      ]
    }

    return [
      ...data,
      ...measurements as string[][]
    ]
  }, [header])

  const CSVString = unparse(CSVData, { delimiter: '\t'})

  return CSVString
}

export const readCSV = (file: File): Promise<DataFileMeta<CSVFile>> => new Promise<DataFileMeta<CSVFile>>((resolve, reject) => {
  const reader = new FileReader();

  reader.onload = async () => {
    const parsed: ParseResult<string[]> = parse<string[]>(reader.result as string)
  
    if (reader.result === null) {
      return reject()
    }

    const csvFile = getCSVFile(parsed.data)

    resolve({
      data: csvFile,
      selectedData: csvFile,
    })
  }
  reader.onerror = error => reject(error);

  reader.readAsText(file)
});

export function arrayBufferToBase64(buffer: ArrayBuffer) {
	var binary = '';
	var bytes = new Uint8Array( buffer );
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode( bytes[ i ] );
	}
	return btoa( binary );
}


export function base64ToArrayBuffer(base64: string) {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

export const cloneObject = (obj: object) => JSON.parse(JSON.stringify(obj))

export const hasReplicates = (data: XLSX.WorkBook): boolean => {

  const spans: XLSXSpan = getXLSXSpan(data)

  return data.SheetNames.some((sheetName: string) => getXLSXReplicaCount(data.Sheets[sheetName], spans[sheetName]) > 1)
}

export const getXLSXReplicaCount = (sheet: XLSX.WorkSheet, span: XLSXSheetSpan): number => {

  const header: string = span.rows[0]

  const checkValue: number = sheet[`${header}${span.columns[0]}`].v

  return span.columns.reduce<number>((counter: number, column: number): number => {
    const value: number = sheet[`${header}${column}`].v

    if (value === checkValue) {
      return counter + 1
    }

    return counter
  }, 0)
}

export const getXLSXFileString = (xlsxFile: XLSX.WorkBook): string => {
  const wopts: XLSX.WritingOptions = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'base64'
  }

  const xlsxBase64 = XLSX.write(cloneObject(xlsxFile), wopts)

  return xlsxBase64
}

export const readXLSX = async (file: File) => new Promise<DataFileMeta<XLSX.WorkBook>>((resolve, reject) => {
  const reader = new FileReader()

  reader.onload = async () => {
    const workbook: XLSX.WorkBook = XLSX.read(reader.result, { type: "array" });
     
    resolve({
      data: workbook,
      selectedData: cloneObject(workbook),
    })
  }

  reader.onerror = error => reject(error);

  reader.readAsArrayBuffer(file)
})

export const getFileStringByType = (fileType: FileType, file: CSVFile | XLSX.WorkBook): string => {
  if (fileType === FileType.CSV) {
    return CSVFileToString(file as CSVFile)
  }

  return getXLSXFileString(file as XLSX.WorkBook)
}

export const readFile = async (dispatch: Dispatch<any>, file?: File): Promise<void> => {
  if (file === undefined) {
    throw new Error('ERR_UNSUPPORTED_FILE')
  }

  const fileType: string = file.type

  if (fileType === FileType.CSV) {
    const csvData: DataFileMeta<CSVFile> = await readCSV(file)

    dispatch(setCSVMetaData(csvData))
    dispatch(setFileType(FileType.CSV))
  } else if (fileType === FileType.XLSX) {
    const csvData: DataFileMeta<XLSX.WorkBook> = await readXLSX(file)

    dispatch(setXLSXMetaData(csvData))
    dispatch(setFileType(FileType.XLSX))
  } else {
    throw new Error('ERR_UNSUPPORTED_FILE')
  }
}