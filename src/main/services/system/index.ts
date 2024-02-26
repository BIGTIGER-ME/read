import { ipcMain } from 'electron'
import { i18n } from '@lingui/core'
import { Locale } from 'locales/constants'
import { isMac } from 'main/utils'
import { createAppMenu, createDockMenu, createPopupMenu } from 'main/menus'
import { SET_LOCALE_EVENT_CHANNEL, SHOW_POPUP_MENU_CHANNEL } from './methods'

class Service {
  listen() {
    ipcMain.handle(SET_LOCALE_EVENT_CHANNEL, async (_event, locale: Locale) => {
      i18n.activate(locale)
      createAppMenu()
      if (isMac) createDockMenu()
    })
    ipcMain.handle(SHOW_POPUP_MENU_CHANNEL, (event) => {
      createPopupMenu(event)
    })
  }
}

export default Service
