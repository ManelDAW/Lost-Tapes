<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import CarruselApp from '../components/CarruselApp.vue';
import CardProducte from '../components/CardProducte.vue';
import { useMovieStore } from '@/stores/movieStore';
import bkgd from '@/assets/img/bkgdHQ.jpg';
import videoSrc from '@/assets/videos/whiteMare.mp4';

const router = useRouter();
const movieStore = useMovieStore();
const videoRef = ref(null);
const videoPlaying = ref(false);

const featured = computed(() => movieStore.peliculas.slice(0, 3));

const categories = computed(() =>
  [...new Set(movieStore.peliculas.map(p => p.category).filter(Boolean))]
);

function playVideo() {
  videoPlaying.value = true;
  videoRef.value?.play();
}
</script>

<template>

  <!-- ── HERO ────────────────────────────────────────────────────── -->
  <section class="hero" :style="{ backgroundImage: `url(${bkgd})` }">
    <div class="hero__overlay">
      <div class="hero__content">
        <p class="hero__label">Tienda de cine de culto</p>
        <h1 class="hero__title">Lost <span>Tapes</span></h1>
        <div class="hero__rule"></div>
        <p class="hero__tagline">Recuperamos lo que el tiempo enterró</p>
        <button class="hero__cta" @click="router.push('/productos')">
          Explorar el catálogo
        </button>
      </div>
    </div>
  </section>

  <div class="container-xl">

    <!-- ── CARRUSEL ─────────────────────────────────────────────── -->
    <section class="home-section">
      <div class="section-header">
        <span class="section-tag">Destacados</span>
        <h2 class="section-title">Esta semana en el catálogo</h2>
        <div class="section-rule"></div>
      </div>
      <CarruselApp />
    </section>

    <!-- ── ÚLTIMAS INCORPORACIONES ──────────────────────────────── -->
    <section class="home-section" v-if="featured.length > 0">
      <div class="section-header">
        <span class="section-tag">Catálogo</span>
        <h2 class="section-title">Últimas incorporaciones</h2>
        <div class="section-rule"></div>
      </div>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        <div class="col" v-for="movie in featured" :key="movie.id">
          <CardProducte :movie="movie" />
        </div>
      </div>
      <div class="text-end mt-3">
        <button class="btn-link-red" @click="router.push('/productos')">
          Ver todo el catálogo →
        </button>
      </div>
    </section>

    <!-- ── CATEGORÍAS ────────────────────────────────────────────── -->
    <section class="home-section" v-if="categories.length > 0">
      <div class="section-header">
        <span class="section-tag">Explorar</span>
        <h2 class="section-title">Por categoría</h2>
        <div class="section-rule"></div>
      </div>
      <div class="categories-strip">
        <button
          v-for="cat in categories" :key="cat"
          class="cat-pill"
          @click="router.push(`/productos?category=${encodeURIComponent(cat)}`)">
          {{ cat }}
        </button>
      </div>
    </section>

    <!-- ── VÍDEO PROMO ───────────────────────────────────────────── -->
    <section class="home-section video-section">
      <div class="video-text">
        <span class="section-tag">Lost Tapes</span>
        <h2 class="section-title">El cine que las grandes plataformas olvidaron</h2>
        <div class="section-rule" style="margin-bottom:16px"></div>
        <p class="video-desc">
          Joyas del cine de autor, obras del cine japonés de los años 60, nuevas olas europeas
          y películas que desafiaron las convenciones de su época.
          Todo curado, todo con historia.
        </p>
      </div>
      <div class="video-wrap">
        <div v-if="!videoPlaying" class="video-poster" @click="playVideo">
          <div class="play-btn">
            <svg viewBox="0 0 24 24" fill="white" width="44" height="44">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <p class="play-label">Reproducir vídeo</p>
        </div>
        <video v-show="videoPlaying" ref="videoRef" controls class="video-player" :src="videoSrc"></video>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* ── Hero ──────────────────────────────────────────────────────── */
.hero {
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(13,13,13,0.65) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero__content { text-align: center; padding: 24px; }

.hero__label {
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #555;
  margin-bottom: 16px;
}

.hero__title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(64px, 12vw, 120px);
  font-weight: 900;
  letter-spacing: 6px;
  text-transform: uppercase;
  color: #fff;
  line-height: 1;
  margin: 0;
}

.hero__title span { color: #c0392b; }

.hero__rule {
  width: 60px;
  height: 2px;
  background: #c0392b;
  margin: 22px auto;
}

.hero__tagline {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(14px, 2vw, 18px);
  font-style: italic;
  font-weight: 400;
  color: #999;
  letter-spacing: 1px;
  margin-bottom: 36px;
}

.hero__cta {
  background: #c0392b;
  color: #fff;
  border: none;
  padding: 14px 40px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.2s;
}

.hero__cta:hover { background: #a93226; }

/* ── Sections ──────────────────────────────────────────────────── */
.home-section {
  padding: 56px 0;
  border-top: 1px solid var(--page-border);
}

.section-header { margin-bottom: 28px; }

.section-tag {
  display: block;
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #c0392b;
  font-weight: 600;
  margin-bottom: 6px;
}

.section-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 700;
  color: var(--page-text);
  margin: 0 0 10px;
  line-height: 1.2;
}

.section-rule {
  width: 36px;
  height: 2px;
  background: #c0392b;
}

/* ── Ver todo ──────────────────────────────────────────────────── */
.btn-link-red {
  background: none;
  border: none;
  color: #c0392b;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.2s;
}

.btn-link-red:hover { opacity: 0.7; }

/* ── Categorías ────────────────────────────────────────────────── */
.categories-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.cat-pill {
  background: none;
  border: 1px solid var(--page-border);
  color: var(--page-muted);
  padding: 8px 22px;
  border-radius: 100px;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.cat-pill:hover {
  border-color: #c0392b;
  color: #c0392b;
}

/* ── Vídeo ─────────────────────────────────────────────────────── */
.video-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
}

@media (max-width: 768px) {
  .video-section { grid-template-columns: 1fr; }
}

.video-desc {
  color: var(--page-muted);
  font-size: 15px;
  line-height: 1.8;
  margin: 0;
}

.video-wrap { position: relative; }

.video-poster {
  background: #0d0d0d;
  border: 1px solid #222;
  border-radius: 6px;
  aspect-ratio: 16/9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 14px;
  transition: border-color 0.2s;
}

.video-poster:hover { border-color: #c0392b; }

.play-btn {
  width: 72px;
  height: 72px;
  background: rgba(192,57,43,0.85);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.2s;
  padding-left: 4px;
}

.video-poster:hover .play-btn {
  background: #c0392b;
  transform: scale(1.08);
}

.play-label {
  color: #555;
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin: 0;
}

.video-player {
  width: 100%;
  border-radius: 6px;
  background: #000;
  display: block;
}
</style>
