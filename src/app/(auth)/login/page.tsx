'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/store'
import { useForm } from '@/hooks/useForm'
import styles from './login.module.scss'
import { LoginResponse } from '@/types/api'
import { authAPI } from '@/lib/api'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { AxiosError } from 'axios'

const initialFormState = {
  username: '',
  password: '',
}

const validationRules = {
  username: { required: true },
  password: { required: true, minLength: 6 },
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const { login, isAuthenticated } = useAuthStore()
  const router = useRouter()
  const { formData, errors, handleChange, validate, isValid } = useForm(
    initialFormState,
    validationRules
  )

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/home')
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    setApiError('')

    try {
      const { username, password } = formData
      const response = await authAPI.login({ username, password })
      const userData: LoginResponse = response.data

      login(userData.token, {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        gender: userData.gender,
        image: userData.image,
      })

      router.push('/home')
    } catch (error: unknown) {
      let errorMessage = 'Invalid credentials'

      if (error instanceof AxiosError && error.response?.data?.message) {
        errorMessage = error.response.data.message
      }

      setApiError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <Card className={styles.loginCard}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="text"
            id="username"
            name="username"
            label="Username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />

          <Input
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          {apiError && <div className={styles.apiError}>{apiError}</div>}

          <Button
            type="submit"
            disabled={!isValid}
            loading={isLoading}
            className={styles.submitButton}
          >
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  )
}
