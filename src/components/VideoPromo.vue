<template>
  <div class="ratio ratio-16x9">
    <video controls preload="metadata" loop playsinline :poster="poster">
      <source :src="video" type="video/mp4">
      Tu navegador no soporta el elemento <code>video</code>.
    </video>
  </div>
</template>

<script setup>
defineProps({
  video: String,
  poster: String
})
</script>