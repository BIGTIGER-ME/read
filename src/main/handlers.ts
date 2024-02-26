import { ipcMain } from 'electron'
import { i18n } from '@lingui/core'
import { Locale } from 'locales/constants'
import { MessageModel } from 'main/models/message'
import * as msgServ from 'main/services/message'
import { isMac } from 'main/utils'
import { createAppMenu, createDockMenu, createPopupMenu } from './menus'

function createHanlders() {
  ipcMain.handle('all-messages', async () => {
    const messages = await msgServ.all()

    return messages
  })

  ipcMain.handle('create-message', async (_event, data: MessageModel) => {
    const messages = await msgServ.create(data)

    return messages
  })

  ipcMain.handle('locales', async (_event, locale: Locale) => {
    i18n.activate(locale)
    createAppMenu()
    if (isMac) createDockMenu()
  })

  ipcMain.handle('show-context-menu', (event) => {
    createPopupMenu(event)
  })
}

export default createHanlders
