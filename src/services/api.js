import axios from 'axios'

const SERVER = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: SERVER,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

export async function getMovies() {
  return api.get('/peliculas')
}

export async function getMovie(id) {
  return api.get(`/peliculas/${id}`)
}

export async function createMovie(data) {
  return api.post('/peliculas', data)
}

export async function updateMovie(id, data) {
  return api.put(`/peliculas/${id}`, data)
}

export async function deleteMovie(id) {
  return api.delete(`/peliculas/${id}`)
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
