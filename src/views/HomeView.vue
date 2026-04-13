<script setup>
import CarruselApp from '@/components/CarruselApp.vue'
import VideoPromo from '@/components/VideoPromo.vue'
</script>

<template>
  <main>
    <section class="mb-5">
      <CarruselApp />
    </section>

    <section class="container mb-5">
      <h2 class="text-center mb-4">Descubre el Cine de Culto</h2>
      <VideoPromo 
        video="src/assets/videos/whiteMare.mp4" 
        poster="src/assets/img/poster.jpg" 
      />
    </section>
  </main>
</template>