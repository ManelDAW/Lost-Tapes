<template>
  <div class="container mt-5 pt-5">
    <Carousel />
    
    <section class="row g-4 my-5">
      <CardPelicula v-for="pel in peliculas" :key="pel.title" :pelicula="pel" class="col-12 col-md-6 col-lg-4" />
    </section>

    <VideoPromo video="/src/assets/videos/whiteMare.mp4" poster="/src/assets/img/poster.jpg" />
  </div>
</template>

<script setup>
import Carousel from '../components/CarruselApp.vue'
import CardPelicula from '../components/CardProducte.vue'
import VideoPromo from '../components/VideoPromo.vue'

const peliculas = [
  { title: 'Harakiri', duracion: "127'", desc: 'Drama samurái que desmonta el código del honor y la hipocresía feudal.', img: '/src/assets/peliculas/harakiri/1.jpg' },
  { title: 'Branded To Kill', duracion: "92'", desc: 'Thriller experimental japonés de los años 60.', img: '/src/assets/peliculas/brandedToKill/1.jpg' },
  { title: 'Andrei Rublev', duracion: "205'", desc: 'Tarkovski retrata el arte, la fe y la condición humana.', img: '/src/assets/peliculas/andreiRublev/1.jpg' }
]
</script>