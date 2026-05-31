export function getImageUrl(movie) {
  const base = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace(/\/api$/, '')
  if (movie?.image) return `${base}/images/${movie.image}`
  return ''
}
