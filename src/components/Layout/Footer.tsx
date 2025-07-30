'use client'

import styles from './Footer.module.scss'
import { useAuthStore } from '@/store/store'

export default function Footer() {
  const { isAuthenticated, user } = useAuthStore()
  const thisYear = new Date().getFullYear()
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <p>{thisYear}.</p>
        {isAuthenticated && <p>Logged as {user?.email}</p>}
      </div>
    </div>
  )
}
