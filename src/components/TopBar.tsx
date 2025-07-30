'use client'

import styles from './TopBar.module.scss'
import { useAuthStore } from '@/store/store'

export default function TopBar() {
  const { isAuthenticated, user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    window.location.href = '/login'
  }

  return (
    <div className={styles.topBar}>
      <div className={styles.container}>
        <div className={styles.contactInfo}>
          <span>📧 shop@abelohost.com</span>
          <span>📍 1734 Stonecoal Road</span>
          <span>📞 +021-95-51-84</span>
        </div>
        <div className={styles.actions}>
          {isAuthenticated ? (
            <div className={styles.userActions}>
              <span>{user?.username}</span>
              <button className={styles.loginButton} onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button className={styles.loginButton} onClick={() => {}}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
