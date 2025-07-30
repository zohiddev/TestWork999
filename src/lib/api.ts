import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const authStorage = localStorage.getItem('auth-storage')
    if (authStorage) {
      const { state } = JSON.parse(authStorage)
      if (state.token) {
        config.headers.Authorization = `Bearer ${state.token}`
      }
    }
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-storage')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: (credentials: { username: string; password: string }) =>
    api.post('/auth/login', credentials),

  getMe: () => api.get('/auth/me'),
}

export const productsAPI = {
  getAll: (params?: { limit?: number; skip?: number }) =>
    api.get('/products', { params }),

  getById: (id: number) => api.get(`/products/${id}`),

  search: (query: string) => api.get(`/products/search?q=${query}`),

  getCategories: () => api.get('/products/categories'),
}

export default api
