'use client'

import type React from 'react'

import { useState, useCallback } from 'react'

interface ValidationRule {
  required?: boolean
  minLength?: number
  pattern?: RegExp
  custom?: (value: string) => string | undefined
}

interface ValidationRules {
  [key: string]: ValidationRule
}

interface FormState {
  [key: string]: string
}

interface FormErrors {
  [key: string]: string | undefined
}

export function useForm(
  initialState: FormState,
  validationRules: ValidationRules
) {
  const [formData, setFormData] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<FormErrors>({})

  const validateField = useCallback(
    (name: string, value: string): string | undefined => {
      const rules = validationRules[name]
      if (!rules) return undefined

      if (rules.required && !value.trim()) {
        return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
      }

      if (rules.minLength && value.length < rules.minLength) {
        return `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } must be at least ${rules.minLength} characters`
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        return `Invalid ${name} format`
      }

      if (rules.custom) {
        return rules.custom(value)
      }

      return undefined
    },
    [validationRules]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))

      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }))
      }
    },
    [errors]
  )

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    Object.keys(validationRules).forEach((field) => {
      const error = validateField(field, formData[field] || '')
      if (error) {
        newErrors[field] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }, [formData, validateField, validationRules])

  const reset = useCallback(() => {
    setFormData(initialState)
    setErrors({})
  }, [initialState])

  return {
    formData,
    errors,
    handleChange,
    validate,
    reset,
    isValid:
      Object.keys(errors).length === 0 &&
      Object.values(formData).every((value) => value.trim()),
  }
}
