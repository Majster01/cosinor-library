import React from 'react'
import { parse, ParseResult } from 'papaparse'
import { UploadFile } from '../../../upload-file';

export const fileToString = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();

  reader.onload = () => resolve(reader.result as string);
  reader.onerror = error => reject(error);

  reader.readAsText(file)
});

export interface UploadDataFormProps {
  onDataCallback(data: string[][]): void
}

export const UploadDataForm: React.FC<UploadDataFormProps> = (props: UploadDataFormProps) => {

  const {
    onDataCallback,
  } = props

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('onFileChange', event.target.value, event.target.files)
    const fileString: string | undefined = event.target.files !== null && event.target.files.length > 0
      ? await fileToString(event.target.files[0])
      : undefined
  
    if (fileString !== undefined) {
      const file: ParseResult<string[]> = parse<string[]>(fileString)

      onDataCallback(file.data)
    }

  }

  return (
    <div>
      <UploadFile onChange={onFileChange} />
    </div>
  )
}
