import AuthGuard from '@/components/AuthGuard'
import Navigation from '@/components/Navigation'
import ProductSection from '@/components/ProductSection'
import TopBar from '@/components/TopBar'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'

export default function HomePage() {
  return (
    <AuthGuard>
      <TopBar />
      <Header />
      <Navigation />
      <ProductSection />
      <Footer />
    </AuthGuard>
  )
}
