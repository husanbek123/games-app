import React, { ReactNode } from 'react'
import styles from './index.module.scss'

type Props = {
    children: ReactNode
}

export default function Sidebar({children}: Props) {
  return (
    <div>
        {children}
    </div>
  )
}