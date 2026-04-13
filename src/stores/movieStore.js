import { defineStore } from 'pinia'
import { getDBEmployees } from '@/services/api.js' // Importamos tu lógica de API

export const useMovieStore = defineStore('movieStore', {
    state: () => ({
        peliculas: [
            {
                id: 1,
                title: "Harakiri",
                duracion: "127'",
                desc: "Drama samurái que desmonta el código del honor.",
                img: "/src/assets/img/peliculas/harakiri/1.jpg"
            },
            {
                id: 2,
                title: "Branded To Kill",
                duracion: "92'",
                desc: "Thriller experimental japonés.",
                img: "/src/assets/img/peliculas/brandedToKill/1.jpg"
            },
            {
                id: 3,
                title: "Andrei Rublev",
                duracion: "205'",
                desc: "Retrato de Tarkovski sobre arte y fe.",
                img: "/src/assets/img/peliculas/andreiRublev/1.jpg"
            }
        ],
        loading: false,
        error: null
    }),

    actions: {
        // Acción para cargar datos reales en el futuro
        async fetchMovies() {
            this.loading = true
            try {
                // Ejemplo usando tu función de api.js
                // const response = await getDBEmployees() 
                // this.peliculas = response.data
            } catch (err) {
                this.error = "Error al cargar las películas"
            } finally {
                this.loading = false
            }
        }
    }
})