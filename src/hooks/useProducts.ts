'use client'

import { productsAPI } from '@/lib/api'
import { Product, ProductsResponse } from '@/types/api'
import { AxiosError } from 'axios'
import { useState, useEffect } from 'react'

interface UseProductsOptions {
  limit?: number
  skip?: number
  autoFetch?: boolean
}

export function useProducts(options: UseProductsOptions = {}) {
  const { limit = 30, skip = 0, autoFetch = true } = options

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await productsAPI.getAll({ limit, skip })
      const data: ProductsResponse = response.data

      setProducts(data.products)
      setTotal(data.total)
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Failed to fetch products')
      }
    } finally {
      setLoading(false)
    }
  }

  const searchProducts = async (query: string) => {
    if (!query.trim()) {
      fetchProducts()
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await productsAPI.search(query)
      const data: ProductsResponse = response.data

      setProducts(data.products)
      setTotal(data.total)
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Failed to search products')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (autoFetch) {
      fetchProducts()
    }
  }, [limit, skip, autoFetch])

  return {
    products,
    loading,
    error,
    total,
    fetchProducts,
    searchProducts,
  }
}
