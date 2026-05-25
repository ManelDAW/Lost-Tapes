import { defineStore } from 'pinia'

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    user: null,
    peliculas: [
      {
        id: 1,
        title: "Harakiri",
        folder: "harakiri", // Coincide con tu carpeta harakiri
        duracion: "127'",
        desc: "Drama samurái que desmonta el código del honor.",
        img: "/img/peliculas/harakiri/1.jpg"
      },
      {
        id: 2,
        title: "Branded To Kill",
        folder: "brandedToKill", // Coincide con tu carpeta brandedToKill
        duracion: "92'",
        desc: "Thriller experimental japonés.",
        img: "/img/peliculas/brandedToKill/1.jpg"
      },
      {
        id: 3,
        title: "Andrei Rublev",
        folder: "andreiRublev", // Coincide con tu carpeta andreiRublev
        duracion: "205'",
        desc: "Retrato de Tarkovski sobre arte y fe.",
        img: "/img/peliculas/andreiRublev/1.jpg"
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