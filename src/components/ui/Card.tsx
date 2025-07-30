import type React from 'react'
import styles from './Card.module.scss'

interface CardProps {
  children: React.ReactNode
  hover?: boolean
  className?: string
}

export default function Card({
  children,
  hover = false,
  className = '',
}: CardProps) {
  return (
    <div className={`${styles.card} ${hover ? styles.hover : ''} ${className}`}>
      {children}
    </div>
  )
}
