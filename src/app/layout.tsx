import { Inter } from 'next/font/google'
import '@/assets/scss/globals.scss'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <head></head>
      <body>{children}</body>
    </html>
  )
}
