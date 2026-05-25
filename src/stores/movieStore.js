import { defineStore } from 'pinia'

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    user: null,
    peliculas: [
      {
        id: 1,
        title: "Harakiri",
        folder: "harakiri",
        duracion: "127'",
        desc: "Drama samurái que desmonta el código del honor. Un ronin sin amo llega a la mansión de los Iyi para solicitar un lugar donde realizar el harakiri. Lo que parece una historia de honor se convierte en una devastadora denuncia del sistema feudal japonés.",
        likes: 0,
        comments: []
      },
      {
        id: 2,
        title: "Branded To Kill",
        folder: "brandedToKill",
        duracion: "92'",
        desc: "Thriller experimental japonés del director Seijun Suzuki. Un asesino a sueldo obsesionado con el olor del arroz cocido se ve envuelto en una espiral de violencia y erotismo que desafía toda lógica narrativa.",
        likes: 0,
        comments: []
      },
      {
        id: 3,
        title: "Andrei Rublev",
        folder: "andreiRublev",
        duracion: "205'",
        desc: "Retrato monumental de Tarkovski sobre el iconógrafo medieval ruso Andrei Rublev. A través de episodios independientes, la película explora la relación entre el arte, la fe y la brutalidad de la historia.",
        likes: 0,
        comments: []
      }
    ],
    loading: false,
    error: null
  }),

  actions: {
    setUser(user) {
      this.user = user;
    },
    logout() {
      this.user = null;
    },
    addComment(movieId, comment) {
      const movie = this.peliculas.find(p => p.id === movieId);
      if (movie) movie.comments.push(comment);
    },
    toggleLike(movieId) {
      const movie = this.peliculas.find(p => p.id === movieId);
      if (movie) movie.likes++;
    },
    async fetchMovies() {
      this.loading = true
      try {
        // Aquí llamarías a getDBEmployees() o similar en el futuro
        // const data = await getDBEmployees()
        // this.peliculas = data
      } catch (err) {
        this.error = "Error al cargar las películas"
        console.error(err)
      } finally {
        this.loading = false
      }
    }
  }
})