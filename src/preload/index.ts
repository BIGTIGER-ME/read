import { contextBridge } from 'electron'
import { methods as system } from '../main/services/system/methods'
import { methods as document } from '../main/services/document'

// Custom APIs for renderer
export const api = {
  system,
  document
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.api = api
}
