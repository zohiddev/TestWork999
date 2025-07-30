import styles from './Header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>Abelohost Shop</h1>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.cartButton}>🛒 Cart (0)</button>
        </div>
      </div>
    </header>
  )
}
