<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useMovieStore } from '@/stores/movieStore';
import { useRouter } from 'vue-router';
import { getImageUrl } from '@/utils/imageUrl';

const router = useRouter();

const movieStore = useMovieStore();
const currentIndex = ref(0);
let timerPelicula = null;

const totalSlides = computed(() => Math.min(3, movieStore.peliculas.length));

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % totalSlides.value;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + totalSlides.value) % totalSlides.value;
};

onMounted(() => {
  timerPelicula = setInterval(nextSlide, 10000);
});

onUnmounted(() => {
  clearInterval(timerPelicula);
});
</script>

<template>
  <section class="carrusel-wrapper">
    <div v-if="movieStore.peliculas.length > 0" class="carrusel-container">
      
      <!-- Flechas de navegación -->
      <button class="nav-btn prev" @click="prevSlide" aria-label="Anterior">❮</button>
      
      <div class="slide-content" style="cursor:pointer;"
           @click="router.push(`/productos/${movieStore.peliculas[currentIndex].id}`)">
        <img
          :src="getImageUrl(movieStore.peliculas[currentIndex])"
          :alt="movieStore.peliculas[currentIndex].title"
          class="slide-img"
        >
        <div class="info-panel">
          <h3 class="movie-title">{{ movieStore.peliculas[currentIndex].title }}</h3>
          <p class="movie-desc">{{ movieStore.peliculas[currentIndex].desc }}</p>
        </div>
      </div>

      <button class="nav-btn next" @click="nextSlide" aria-label="Siguiente">❯</button>

      <!-- Puntos indicadores -->
      <div class="indicators">
        <span
          v-for="i in totalSlides"
          :key="'dot-'+i"
          :class="['dot', { active: (i - 1) === currentIndex }]"
          @click="currentIndex = (i - 1)"
        ></span>
      </div>

    </div>
  </section>
</template>

<style scoped>
.carrusel-wrapper {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto 40px auto;
  background: #000;
  position: relative; /* Necesario para posicionar indicadores y flechas */
}

.carrusel-container {
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 4px;
}

.slide-content {
  width: 100%;
  height: 100%;
  position: relative;
}

.slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.info-panel {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 25px 40px;
  text-align: left;
  z-index: 5;
}

.movie-title { margin: 0; font-size: 1.6rem; font-weight: bold; }
.movie-desc { margin: 5px 0 0; color: #ddd; font-size: 1rem; }

/* Estilos de las flechas */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  font-size: 2rem;
  padding: 15px;
  cursor: pointer;
  z-index: 10;
  transition: background 0.3s;
}

.nav-btn:hover {
  background: rgba(0, 0, 0, 0.7);
}

.prev { left: 0; }
.next { right: 0; }

/* Estilos de los puntos indicadores */
.indicators {
  position: absolute;
  bottom: 20px;
  right: 30px;
  display: flex;
  gap: 10px;
  z-index: 10;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: background 0.3s;
}

.dot.active {
  background: #ffffff;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}
</style>