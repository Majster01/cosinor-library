import React from 'react'
import { parse, ParseResult } from 'papaparse'
import XLSX, { WorkBook } from 'xlsx'
import { UploadFile } from '../../global/inputs/upload-file';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { DataFileMeta, setCSVMetaData, setXLSXMetaData, FileType, setFileType } from '../../../store/options_slice';
import { ValidFileTooltips } from './valid_file_tooltips';

export const readCSV = (file: File): Promise<DataFileMeta<string[][], string>> => new Promise<DataFileMeta<string[][], string>>((resolve, reject) => {
  const reader = new FileReader();

  reader.onload = async () => {
    const parsed: ParseResult<string[]> = parse<string[]>(reader.result as string)
  
    if (reader.result === null) {
      return reject()
    }

    resolve({
      data: parsed.data,
      selectedData: parsed.data,
      file: reader.result as string,
    })
  }
  reader.onerror = error => reject(error);

  reader.readAsText(file)
});

export interface UploadDataFormProps {
  onDataCallback(data: string[][]): void
}

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

export const readXLSX = async (file: File) => new Promise<DataFileMeta<WorkBook, string>>((resolve, reject) => {
  const reader = new FileReader()

  reader.onload = async () => {
    const workbook: XLSX.WorkBook = XLSX.read(reader.result, { type: "array" });
    
    let base64String: string = arrayBufferToBase64(reader.result as ArrayBuffer)

    resolve({
      data: workbook,
      selectedData: workbook,
      file: base64String,
    })
  }

  reader.onerror = error => reject(error);

  reader.readAsArrayBuffer(file)
})

const readFile = async (dispatch: Dispatch<any>, file?: File): Promise<void> => {
  console.log('FILE', file)
  if (file === undefined) {
    throw new Error('ERR_UNSUPPORTED_FILE')
  }

  const fileType: string = file.type

  if (fileType === FileType.CSV) {
    const csvData: DataFileMeta<string[][], string> = await readCSV(file)

    dispatch(setCSVMetaData(csvData))
    dispatch(setFileType(FileType.CSV))
  } else if (fileType === FileType.XLSX) {
    const csvData: DataFileMeta<WorkBook, string> = await readXLSX(file)

    dispatch(setXLSXMetaData(csvData))
    dispatch(setFileType(FileType.XLSX))
  } else {
    throw new Error('ERR_UNSUPPORTED_FILE')
  }
}

export const UploadDataForm: React.FC = () => {

  const dispatch = useDispatch()

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

    await readFile(dispatch, event.target.files !== null && event.target.files.length > 0
      ? event.target.files[0]
      : undefined
    )
  }

  return (
    <div>
      <UploadFile onChange={onFileChange} />
      <ValidFileTooltips />
    </div>
  )
}
