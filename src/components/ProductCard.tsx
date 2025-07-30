import Image from 'next/image'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import type { Product } from '@/types/api'
import styles from './ProductCard.module.scss'
import { useAuthStore } from '@/store/store'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isAuthenticated } = useAuthStore()
  const discountedPrice = product.price * (1 - product.discountPercentage / 100)

  return (
    <Card hover className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.thumbnail || '/placeholder.svg'}
          alt={product.title}
          width={200}
          height={200}
          className={styles.productImage}
        />
        {product.discountPercentage > 0 && (
          <div className={styles.discount}>
            -{Math.round(product.discountPercentage)}%
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.brand}>{product.brand}</div>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.category}>{product.category}</p>
        <div className={styles.rating}>
          <span className={styles.stars}>
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </span>
          <span className={styles.ratingValue}>({product.rating})</span>
        </div>
        <div className={styles.priceContainer}>
          {product.discountPercentage > 0 ? (
            <>
              <span className={styles.discountedPrice}>
                ${discountedPrice.toFixed(2)}
              </span>
              <span className={styles.originalPrice}>
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className={styles.price}>${product.price.toFixed(2)}</span>
          )}
        </div>
        <div className={styles.stock}>
          {product.stock > 0 ? (
            <span className={styles.inStock}>In Stock ({product.stock})</span>
          ) : (
            <span className={styles.outOfStock}>Out of Stock</span>
          )}
        </div>
        {isAuthenticated && (
          <Button
            variant="primary"
            size="md"
            className={styles.addButton}
            disabled={product.stock === 0}
          >
            Add to Cart
          </Button>
        )}
      </div>
    </Card>
  )
}
