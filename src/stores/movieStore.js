import { defineStore } from 'pinia'
import { getMovies, login, logout, getProfile } from '@/services/api'

// Mapea un producto del backend al formato que usa el frontend
function mapProduct(p) {
  return {
    id: p.id,
    title: p.name,
    desc: p.description || '',
    duracion: p.duracion || '',
    folder: p.folder || null,
    image: p.image || null,
    price: p.price,
    stock: p.stock,
    sku: p.sku,
    category: p.category || '',
    likes: p.likes ?? 0,
    comments: p.comments ?? [],
  }
}

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    user: null,
    peliculas: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchMovies() {
      this.loading = true
      this.error = null
      try {
        const res = await getMovies()
        const data = res.data?.data ?? res.data
        this.peliculas = Array.isArray(data) ? data.map(mapProduct) : []
      } catch {
        this.error = 'No se pudo conectar con el servidor.'
      } finally {
        this.loading = false
      }
    },

    async loginUser(email, password) {
      try {
        const res = await login(email, password)
        const token = res.data?.token
        const user  = res.data?.user

        if (token && user) {
          localStorage.setItem('auth_token', token)
          this.user = { id: user.id, name: user.name, email: user.email, role: user.role ?? 'editor' }
          return { ok: true }
        }
        return { ok: false, message: 'Respuesta inesperada del servidor.' }
      } catch (err) {
        const status = err.response?.status
        if (status === 401 || status === 422) {
          return { ok: false, message: 'Email o contraseña incorrectos.' }
        }
        return { ok: false, message: 'No se puede conectar con el servidor.' }
      }
    },

    async logoutUser() {
      try { await logout() } catch { /* continúa aunque falle */ }
      localStorage.removeItem('auth_token')
      this.user = null
    },

    async restoreSession() {
      const token = localStorage.getItem('auth_token')
      if (!token) return
      try {
        const res = await getProfile()
        const u = res.data
        this.user = { id: u.id, name: u.name, email: u.email, role: u.role ?? 'editor' }
      } catch {
        localStorage.removeItem('auth_token')
      }
    },

    setUser(user) {
      this.user = user
    },

    logout() {
      this.logoutUser()
    },

    addComment(movieId, comment) {
      const movie = this.peliculas.find(p => p.id === movieId)
      if (movie) movie.comments.push(comment)
    },

    toggleLike(movieId) {
      const movie = this.peliculas.find(p => p.id === movieId)
      if (movie) movie.likes++
    },
  },
})
