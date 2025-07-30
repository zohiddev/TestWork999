import Container from "@/components/ui/Container"
import styles from "./Navigation.module.scss"

const navItems = ["Home", "Hot Deals", "Categories", "Laptops", "Smartphones", "Cameras", "Accessories"]

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <Container>
        <ul className={styles.navList}>
          {navItems.map((item, index) => (
            <li key={index}>
              <a href="#" className={`${styles.navLink} ${index === 0 ? styles.active : ""}`}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  )
}
