<script setup>
import { onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
//import { useCounterStore} from './stores/counter.js'
//import ErrMsg from './components/ErrMsg.vue'

//const store = useCounterStore()

//onMounted(()=>store.loadEmployees())
</script>

<template>
  <section class="text-center mb-5" role="region" aria-labelledby="hero-title">
    <h2 id="hero-title" class="section-title">New Cult Movies</h2>
    <div id="mainCarousel" class="carousel slide mt-4" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#mainCarousel"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#mainCarousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#mainCarousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="./public/img/peliculas/harakiri/1.jpg"
            class="d-block w-100"
            alt="Harakiri"
            loading="lazy"
          />
          <div class="carousel-caption d-none d-md-block text-start">
            <h5>Harakiri</h5>
            <p>Drama samurái que desmonta el código del honor.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img
            src="./public/img/peliculas/brandedToKill/1.jpg"
            class="d-block w-100"
            alt="Branded To Kill"
            loading="lazy"
          />
          <div class="carousel-caption d-none d-md-block text-start">
            <h5>Branded To Kill</h5>
            <p>Thriller experimental japonés.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img
            src="./public/img/peliculas/andreiRublev/1.jpg"
            class="d-block w-100"
            alt="Andrei Rublev"
            loading="lazy"
          />
          <div class="carousel-caption d-none d-md-block text-start">
            <h5>Andrei Rublev</h5>
            <p>Retrato de Tarkovski sobre arte y fe.</p>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#mainCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#mainCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Siguiente</span>
      </button>
    </div>
  </section>
  <section role="region" aria-labelledby="peliculas-title">
    <h2 id="peliculas-title" class="section-title visually-hidden">
      Películas Destacadas
    </h2>
    <div class="row g-4">
      <div class="col-12 col-md-6 col-lg-4">
        <article class="card pelicula-card h-100" role="article">
          <img
            src="./public/img/peliculas/harakiri/1.jpg"
            class="card-img-top"
            alt="Harakiri"
            loading="lazy"
          />
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h5 class="card-title">Harakiri</h5>
              <span class="duracion">127'</span>
            </div>
            <p class="card-text">
              Drama samurái que desmonta el código del honor y la hipocresía
              feudal.
            </p>
          </div>
        </article>
      </div>

      <div class="col-12 col-md-6 col-lg-4">
        <article class="card pelicula-card h-100" role="article">
          <img
            src="./public/img/peliculas/brandedToKill/1.jpg"
            class="card-img-top"
            alt="Branded To Kill"
            loading="lazy"
          />
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h5 class="card-title">Branded To Kill</h5>
              <span class="duracion">92'</span>
            </div>
            <p class="card-text">
              Thriller experimental japonés de los años 60.
            </p>
          </div>
        </article>
      </div>

      <div class="col-12 col-md-6 col-lg-4">
        <article class="card pelicula-card h-100" role="article">
          <img
            src="./public/img/peliculas/andreiRublev/1.jpg"
            class="card-img-top"
            alt="Andrei Rublev"
            loading="lazy"
          />
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h5 class="card-title">Andrei Rublev</h5>
              <span class="duracion">205'</span>
            </div>
            <p class="card-text">
              Tarkovski retrata el arte, la fe y la condición humana.
            </p>
          </div>
        </article>
      </div>
      <section
        id="video"
        class="mb-5 video-section mt-5"
        role="region"
        aria-labelledby="video-title"
      >
        <h2 id="video-title" class="visually-hidden">Video Promocional</h2>
        <div class="container">
          <div class="ratio ratio-16x9">
            <video
              id="reproductor"
              class="w-100 h-100"
              controls
              preload="metadata"
              loop
              playsinline
              poster="./public/img/poster.jpg"
            >
              <source src="./public/videos/whiteMare.mp4" type="video/mp4" />
              <track
                kind="captions"
                src="./public/subtitles/whiteMare.vtt"
                srclang="es"
                label="Español"
                default
              />
              Tu navegador no soporta el elemento <code>video</code>.
            </video>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css");
</style>
<!--
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="./js/main.js"></script> -->
