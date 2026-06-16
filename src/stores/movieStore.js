import { defineStore } from 'pinia'
import { getMovies, getMovie, login, logout, getProfile, likeProduct, postComment } from '@/services/api'

// Mapea un producto del backend al formato que usa el frontend
function mapProduct(p) {
  return {
    id: p.id,
    title: p.name,
    desc: p.description || '',
    duracion: p.duration || '',
    folder: p.folder || null,
    image: p.image || null,
    price: p.price,
    stock: p.stock,
    sku: p.sku,
    category: p.category || '',
    likes: p.likes_count ?? p.likes ?? 0,
    comments: (p.comments ?? []).map(c => ({
      id: c.id,
      user: c.user?.name ?? 'Usuario',
      text: c.body,
      date: new Date(c.created_at).toLocaleDateString('es-ES'),
    })),
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

    async addComment(movieId, commentData) {
      const { data } = await postComment(movieId, commentData.text)
      const movie = this.peliculas.find(p => p.id === movieId)
      if (movie) {
        movie.comments.push({
          id: data.id,
          user: data.user?.name ?? 'Usuario',
          text: data.body,
          date: new Date(data.created_at).toLocaleDateString('es-ES'),
        })
      }
    },

    async toggleLike(movieId) {
      const { data } = await likeProduct(movieId)
      const movie = this.peliculas.find(p => p.id === movieId)
      if (movie) movie.likes = data.likes_count
      return data.liked
    },

    async fetchMovie(id) {
      const { data } = await getMovie(id)
      const product = data.data ?? data
      const mapped = mapProduct(product)
      const idx = this.peliculas.findIndex(p => p.id === mapped.id)
      if (idx !== -1) this.peliculas[idx] = mapped
      else this.peliculas.push(mapped)
      return { ...mapped, user_liked: data.user_liked ?? false }
    },
  },
})
