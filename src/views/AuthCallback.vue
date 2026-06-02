<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMovieStore } from '@/stores/movieStore';

const router = useRouter();
const movieStore = useMovieStore();

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const name  = params.get('name');
  const role  = params.get('role');

  if (token && name) {
    localStorage.setItem('auth_token', token);
    movieStore.setUser({ name, role: role ?? 'editor', email: '' });
    router.replace('/');
  } else {
    router.replace('/login');
  }
});
</script>

<template>
  <div class="d-flex justify-content-center align-items-center" style="min-height:100vh;">
    <div class="text-center" style="color: var(--page-muted);">
      <div class="spinner-border mb-3" style="color: var(--accent);" role="status"></div>
      <p>Completando inicio de sesión...</p>
    </div>
  </div>
</template>
