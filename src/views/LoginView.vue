<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMovieStore } from '@/stores/movieStore';

const router = useRouter();
const movieStore = useMovieStore();

const email = ref('');
const password = ref('');
const error = ref('');

// Usuarios simulados hasta conectar con Laravel
const fakeUsers = [
  { id: 1, name: 'Admin',   email: 'admin@losttapes.com',   password: '1234', role: 'admin' },
  { id: 2, name: 'Vendedor', email: 'vendedor@losttapes.com', password: '1234', role: 'vendedor' },
  { id: 3, name: 'Editor',  email: 'editor@losttapes.com',  password: '1234', role: 'editor' },
];

const handleLogin = () => {
  error.value = '';
  const user = fakeUsers.find(u => u.email === email.value && u.password === password.value);

  if (!user) {
    error.value = 'Email o contraseña incorrectos.';
    return;
  }

  movieStore.setUser(user);
  router.push('/');
};
</script>

<template>
  <section class="login-section">
    <div class="film-container">
      <div class="film-edge left"></div>

      <div class="form-content">
        <img src="@/assets/img/Logo_Tapes.png" alt="Logo" class="logo" />
        <h1>Iniciar sesión</h1>
        <p class="subtitle">Accede a tu cuenta de Lost Tapes</p>

        <form @submit.prevent="handleLogin" class="styled-form">
          <div class="form-group">
            <label for="email">Correo electrónico</label>
            <input v-model="email" type="email" id="email" placeholder="tu@correo.com" required />
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <input v-model="password" type="password" id="password" placeholder="••••••••" required />
          </div>

          <p v-if="error" class="error-msg">{{ error }}</p>

          <button type="submit" class="submit-btn">Entrar</button>
        </form>

        <p class="hint">
          Prueba: <code>admin@losttapes.com</code> / <code>1234</code>
        </p>
      </div>

      <div class="film-edge right"></div>
    </div>
  </section>
</template>

<style scoped>
.login-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 60px 20px;
}

.film-container {
  display: flex;
  background-color: #111;
  border: 1px solid #333;
  max-width: 480px;
  width: 100%;
}

.film-edge {
  width: 40px;
  background-color: #111;
  position: relative;
  flex-shrink: 0;
}

.film-edge::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 22px;
  height: 100%;
  background-image: linear-gradient(to bottom, #eee 20px, transparent 20px);
  background-size: 100% 40px;
}

.form-content {
  flex: 1;
  padding: 40px 30px;
  color: white;
  text-align: center;
}

.logo {
  width: 60px;
  background: white;
  padding: 4px;
  margin-bottom: 20px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 8px;
}

.subtitle {
  color: #aaa;
  font-size: 0.9rem;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 0.9rem;
}

input {
  width: 100%;
  padding: 12px;
  background-color: #000;
  border: 1px solid #444;
  color: white;
  border-radius: 4px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #ff6600;
}

.error-msg {
  color: #ff4444;
  font-size: 0.85rem;
  margin-bottom: 15px;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background-color: #fff;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  text-transform: uppercase;
  border: none;
  margin-top: 10px;
  transition: background 0.2s;
}

.submit-btn:hover {
  background-color: #ff6600;
  color: white;
}

.hint {
  margin-top: 24px;
  font-size: 0.8rem;
  color: #666;
}

.hint code {
  color: #ff6600;
}
</style>
