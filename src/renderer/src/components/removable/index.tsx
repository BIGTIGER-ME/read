import { cloneElement, ReactElement, PropsWithChildren } from 'react'
import { cn } from 'renderer/utils'
import styles from './styles.module.css'

export function Removable({ children }: PropsWithChildren<{}>) {
  return cloneElement(children as ReactElement, {
    className: cn((children as ReactElement).props?.className, styles.removable)
  })
}

export function NotRemovable({ children }: PropsWithChildren<{}>) {
  return cloneElement(children as ReactElement, {
    className: cn((children as ReactElement).props?.className, styles.not)
  })
}
