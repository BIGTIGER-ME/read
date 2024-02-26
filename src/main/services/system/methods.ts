import { ipcRenderer } from 'electron'
import { Locale } from 'locales/constants'

export const SET_LOCALE_EVENT_CHANNEL = 'SET_LOCALE'
export const SHOW_POPUP_MENU_CHANNEL = 'SHOW_POPUP_MENU'

export const methods = {
  setLocale: (locale: Locale): void => {
    ipcRenderer.invoke(SET_LOCALE_EVENT_CHANNEL, locale)
  },
  showPopupMenu: (): void => {
    ipcRenderer.invoke(SHOW_POPUP_MENU_CHANNEL)
  }
}
