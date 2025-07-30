import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"
import styles from "./TopBar.module.scss"

const contactInfo = [
  { icon: "📧", text: "info@abelohost.com" },
  { icon: "📍", text: "123 Business Street, City" },
  { icon: "📞", text: "+1 (555) 123-4567" },
]

export default function TopBar() {
  return (
    <div className={styles.topBar}>
      <Container>
        <div className={styles.content}>
          <div className={styles.contactInfo}>
            {contactInfo.map((item, index) => (
              <span key={index} className={styles.contactItem}>
                {item.icon} {item.text}
              </span>
            ))}
          </div>
          <Button variant="secondary" size="sm">
            Account
          </Button>
        </div>
      </Container>
    </div>
  )
}
