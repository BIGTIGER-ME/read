import { useContext } from 'react'
import { msg } from '@lingui/macro'
import { MessageDescriptor } from '@lingui/core'
import { useLingui } from '@lingui/react'
import { Locale } from 'locales/constants'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from 'renderer/components/ui/select'
import { LocaleProviderContext } from './provider'

const languages: { [key in Locale]: MessageDescriptor } = {
  [Locale.enUS]: msg`English`,
  [Locale.zhCN]: msg`Chinese Simplified`
}

function Switcher() {
  const { i18n } = useLingui()
  const { locale, setLocale } = useContext(LocaleProviderContext)

  return (
    <Select value={locale} onValueChange={(value: Locale) => setLocale(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(languages).map((locale) => (
          <SelectItem key={locale} value={locale}>
            {i18n._(languages[locale as Locale])}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default Switcher
