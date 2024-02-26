import { useState, useCallback, useEffect } from 'react'
import { Trans } from '@lingui/macro'
import * as I18n from 'renderer/components/i18n'
import * as Theme from 'renderer/components/theme'
import { Button } from 'renderer/components/ui/button'
import Versions from 'renderer/components/versions'
import electronLogo from 'renderer/assets/electron.svg'
import styles from './styles.module.css'

interface IMessage {
  id: number
  content: string
}

function Home() {
  const [messages, setMessages] = useState<IMessage[]>([])
  const createMessage = useCallback(async () => {
    const messages = await window.api.message.create({ content: 'test' })

    setMessages(messages)
  }, [setMessages])

  useEffect(() => {
    window.api.message.all().then((messages) => {
      setMessages(messages)
    })
  }, [])

  return (
    <>
      <img alt="logo" className={styles.logo} src={electronLogo} />
      <div className={styles.creator}>
        <Trans>
          Powered by{' '}
          <span className={styles.technology}>
            electron-vite, React, TypeScript, Lingui.js, shadcn/ui, better-sqlite3, TypeORM
          </span>
        </Trans>
      </div>
      <div className={styles.text}>
        <Trans>Genesis Electron</Trans>
      </div>
      <p className={styles.tip}>
        <Trans>
          Please try pressing <code>F12</code> to open the devTool
        </Trans>
      </p>
      <div className={styles.actions}>
        <div className={styles.action}>
          <Button variant="outline" onClick={createMessage}>
            <Trans>Create Message</Trans>
          </Button>
        </div>
        <div className={styles.action}>
          <I18n.Switcher />
        </div>
        <div className={styles.action}>
          <Theme.Switcher />
        </div>
      </div>
      <div className={styles.actions}>
        <div className={styles.action}>
          <Button variant="ghost">
            <Trans>Message Count: {messages.length}</Trans>
          </Button>
        </div>
      </div>
      <Versions className={styles.versions} />
    </>
  )
}

export default Home
