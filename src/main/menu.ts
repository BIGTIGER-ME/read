import {
  app,
  shell,
  Menu,
  BrowserWindow,
  IpcMainInvokeEvent,
  MenuItemConstructorOptions
} from 'electron'
import { i18n } from '@lingui/core'
import { isMac } from 'main/utils'
import { createWindow } from './window'

export function createAppMenu() {
  const main: MenuItemConstructorOptions[] = isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: 'about', label: i18n._('About {name}', { name: app.name }) },
            { type: 'separator' },
            { role: 'services', label: i18n._('Services') },
            { type: 'separator' },
            { role: 'hide', label: i18n._('Hide {name}', { name: app.name }) },
            { role: 'hideOthers', label: i18n._('Hide Others') },
            { role: 'unhide', label: i18n._('Show All') },
            { type: 'separator' },
            { role: 'quit', label: i18n._('Quit {name}', { name: app.name }) }
          ]
        }
      ]
    : []
  const files: MenuItemConstructorOptions[] = isMac
    ? [{ role: 'close', label: i18n._('Close Window') }]
    : [{ role: 'quit', label: i18n._('Quit Window') }]
  const edit: MenuItemConstructorOptions[] = isMac
    ? [
        { role: 'pasteAndMatchStyle', label: i18n._('Paste And Match Style') },
        { role: 'delete', label: i18n._('Delete') },
        { role: 'selectAll', label: i18n._('Select All') },
        { type: 'separator' },
        {
          label: i18n._('Speech'),
          submenu: [
            { role: 'startSpeaking', label: i18n._('Start Speaking') },
            { role: 'stopSpeaking', label: i18n._('Stop Speaking') }
          ]
        }
      ]
    : [
        { role: 'delete', label: i18n._('Delete') },
        { type: 'separator' },
        { role: 'selectAll', label: i18n._('Select All') }
      ]
  const window: MenuItemConstructorOptions[] = isMac
    ? [{ type: 'separator' }, { role: 'front', label: i18n._('Bring All to Front') }]
    : [{ role: 'close', label: i18n._('Close Window') }]
  const appMenu = Menu.buildFromTemplate([
    ...main,
    {
      label: i18n._('File'),
      submenu: files
    },
    {
      label: i18n._('Edit'),
      submenu: [
        { role: 'undo', label: i18n._('Undo') },
        { role: 'redo', label: i18n._('Redo') },
        { type: 'separator' },
        { role: 'cut', label: i18n._('Cut') },
        { role: 'copy', label: i18n._('Copy') },
        { role: 'paste', label: i18n._('Paste') },
        ...edit
      ]
    },
    {
      label: i18n._('View'),
      submenu: [
        { role: 'reload', label: i18n._('Reload') },
        { role: 'forceReload', label: i18n._('Force Reload') },
        { role: 'toggleDevTools', label: i18n._('Toggle Developer Tools') },
        { type: 'separator' },
        { role: 'resetZoom', label: i18n._('Actual Size') },
        { role: 'zoomIn', label: i18n._('Zoom In') },
        { role: 'zoomOut', label: i18n._('Zoom Out') },
        { type: 'separator' },
        { role: 'togglefullscreen', label: i18n._('Toggle Full Screen') }
      ]
    },
    {
      label: i18n._('Window'),
      role: 'windowMenu',
      submenu: [
        { role: 'minimize', label: i18n._('Minimize') },
        { role: 'zoom', label: i18n._('Zoom') },
        ...window
      ]
    },
    {
      role: 'help',
      label: i18n._('Help'),
      submenu: [
        {
          label: 'Github',
          click: async () => {
            await shell.openExternal('https://github.com/BIGTIGER-ME/genesis-electron')
          }
        },
        {
          label: i18n._('Documents'),
          submenu: Object.entries({
            Electron: 'https://www.electronjs.org/docs/latest/',
            'electron-vite': 'https://electron-vite.org/guide/',
            React: 'https://react.dev/learn)',
            Typescript: 'https://www.typescriptlang.org/docs/',
            'Lingui.js': 'https://lingui.dev/introduction',
            'shadcn/ui': 'https://ui.shadcn.com/docs',
            'better-sqlite3': 'https://github.com/WiseLibs/better-sqlite3',
            TypeORM: 'https://typeorm.io/'
          }).map(([name, url]) => ({
            label: name,
            click: async () => {
              await shell.openExternal(url)
            }
          }))
        },
        { type: 'separator' },
        {
          label: i18n._('Author: jinyang1994'),
          click: async () => {
            await shell.openExternal('https://x.com/jinyang1994')
          }
        }
      ]
    }
  ])

  Menu.setApplicationMenu(appMenu)
}

export function createDockMenu() {
  const dockMenu = Menu.buildFromTemplate([
    {
      label: i18n._('New Window'),
      click: () => {
        createWindow()
      }
    }
  ])

  app.dock.setMenu(dockMenu)
}

export function createPopupMenu(event: IpcMainInvokeEvent) {
  const popupMenu = Menu.buildFromTemplate([
    { role: 'toggleDevTools', label: i18n._('Toggle Developer Tools') }
  ])

  popupMenu.popup({ window: BrowserWindow.fromWebContents(event.sender) || undefined })
}
