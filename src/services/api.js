import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

// Adjunta el token Sanctum en cada petición si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export async function getMovies(params = {}) {
  return api.get('/products', { params })
}

export async function getMovie(id) {
  return api.get(`/products/${id}`)
}

export async function createMovie(data) {
  return api.post('/products', data)
}

export async function updateMovie(id, data) {
  return api.put(`/products/${id}`, data)
}

export async function deleteMovie(id) {
  return api.delete(`/products/${id}`)
}

export async function login(email, password) {
  return api.post('/login', { email, password })
}

export async function logout() {
  return api.post('/logout')
}

export async function getProfile() {
  return api.get('/user')
}
