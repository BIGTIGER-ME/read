export { default as cn } from './cn'

export const fileToUint8Array = (file: File) => {
  return new Promise<Uint8Array>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      if (!e.target) {
        reject('fileToUint8Array: result is null')
      } else {
        resolve(new Uint8Array(e.target.result as ArrayBuffer))
      }
    }
    reader.readAsArrayBuffer(file)
  })
}
