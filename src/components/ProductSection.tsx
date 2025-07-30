"use client"

import { useProducts } from "@/hooks/useProducts"
import Container from "@/components/ui/Container"
import ProductCard from "./ProductCard"
import styles from "./ProductSection.module.scss"

export default function ProductSection() {
  const { products, loading, error } = useProducts({ limit: 12 })

  if (loading) {
    return (
      <section className={styles.section}>
        <Container>
          <h2 className={styles.title}>Latest Products</h2>
          <div className={styles.loading}>Loading products...</div>
        </Container>
      </section>
    )
  }

  if (error) {
    return (
      <section className={styles.section}>
        <Container>
          <h2 className={styles.title}>Latest Products</h2>
          <div className={styles.error}>Error: {error}</div>
        </Container>
      </section>
    )
  }

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.title}>Latest Products</h2>
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  )
}
