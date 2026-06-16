import { defineStore } from 'pinia'
import { getMovies, getMovie, login, logout, getProfile, likeProduct, postComment } from '@/services/api'

/**
 * Convierte un producto del backend al formato interno del store.
 * El backend usa `name`/`body`/`likes_count`; el frontend usa `title`/`text`/`likes`.
 */
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
    user: null,           // usuario autenticado (null = no hay sesión)
    sessionChecked: false, // true tras la primera llamada a restoreSession
    peliculas: [],
    loading: false,
    error: null,
  }),

  actions: {
    // Carga el catálogo paginado. El backend devuelve { data: [...] } o directamente [].
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

    // Hace login, guarda el token en localStorage y rellena this.user.
    async loginUser(email, password) {
      try {
        const res = await login(email, password)
        const token = res.data?.token
        const user  = res.data?.user

        if (token && user) {
          localStorage.setItem('auth_token', token)
          this.user = { id: user.id, name: user.name, email: user.email, role: user.role ?? 'user' }
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

    // Revoca el token en el backend y limpia el estado local.
    async logoutUser() {
      try { await logout() } catch { /* continúa aunque falle */ }
      localStorage.removeItem('auth_token')
      this.user = null
    },

    // Restaura la sesión al recargar la página usando el token guardado en localStorage.
    // El guard del router llama a este método antes de evaluar permisos.
    async restoreSession() {
      if (this.sessionChecked) return
      const token = localStorage.getItem('auth_token')
      if (token) {
        try {
          const res = await getProfile()
          const u = res.data
          this.user = { id: u.id, name: u.name, email: u.email, role: u.role ?? 'user' }
        } catch {
          localStorage.removeItem('auth_token')
        }
      }
      this.sessionChecked = true
    },

    // Usado por AuthCallback.vue tras el flujo OAuth2: el token ya viene en la URL
    // del redirect, así que no pasamos por loginUser.
    setUser(user) {
      this.user = user
    },

    // Envía el comentario a la API y lo añade localmente para que aparezca sin recargar.
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

    // Toggle like: el backend devuelve { liked, likes_count }.
    // Devuelve el nuevo estado del like para que la vista actualice su ref local.
    async toggleLike(movieId) {
      const { data } = await likeProduct(movieId)
      const movie = this.peliculas.find(p => p.id === movieId)
      if (movie) movie.likes = data.likes_count
      return data.liked
    },

    // Carga el detalle de una película con comentarios y user_liked.
    // Actualiza la película en el array si ya existía, o la añade si es la primera vez.
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
