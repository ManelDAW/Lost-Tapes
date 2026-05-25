<script setup>
import { computed, ref } from 'vue';
import { useMovieStore } from '@/stores/movieStore';

const movieStore = useMovieStore();
const user = computed(() => movieStore.user);

const editMode = ref(false);
const editedName = ref(user.value?.name || '');
const editedEmail = ref(user.value?.email || '');

const saveChanges = () => {
  // Cuando conectemos con Laravel, aquí irá la llamada a la API
  movieStore.setUser({ ...user.value, name: editedName.value, email: editedEmail.value });
  editMode.value = false;
};

const roleLabel = {
  admin: 'Administrador',
  vendedor: 'Vendedor',
  editor: 'Editor',
  user: 'Usuario',
};
</script>

<template>
  <section class="profile-section">
    <div class="profile-card">
      <div class="profile-header">
        <div class="avatar">{{ user?.name?.charAt(0).toUpperCase() }}</div>
        <div>
          <h1>{{ user?.name }}</h1>
          <span class="role-badge">{{ roleLabel[user?.role] || user?.role }}</span>
        </div>
      </div>

      <div class="profile-body">
        <div v-if="!editMode">
          <div class="info-row">
            <span class="info-label">Nombre</span>
            <span class="info-value">{{ user?.name }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Email</span>
            <span class="info-value">{{ user?.email }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Rol</span>
            <span class="info-value">{{ roleLabel[user?.role] || user?.role }}</span>
          </div>
          <button class="btn-edit" @click="editMode = true">Editar perfil</button>
        </div>

        <div v-else class="edit-form">
          <div class="form-group">
            <label>Nombre</label>
            <input v-model="editedName" type="text" />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="editedEmail" type="email" />
          </div>
          <div class="btn-group">
            <button class="btn-save" @click="saveChanges">Guardar</button>
            <button class="btn-cancel" @click="editMode = false">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.profile-section {
  display: flex;
  justify-content: center;
  padding: 60px 20px;
  min-height: 100vh;
}

.profile-card {
  background: #111;
  border: 1px solid #333;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  overflow: hidden;
}

.profile-header {
  background: #1a1a1a;
  padding: 30px;
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid #333;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #ff6600;
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

h1 {
  font-size: 1.4rem;
  color: white;
  margin: 0 0 6px 0;
}

.role-badge {
  background: #ff6600;
  color: white;
  font-size: 0.75rem;
  padding: 3px 10px;
  border-radius: 20px;
  font-weight: bold;
  text-transform: uppercase;
}

.profile-body {
  padding: 30px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid #222;
  color: white;
}

.info-label {
  color: #888;
  font-size: 0.9rem;
}

.info-value {
  font-size: 0.9rem;
}

.btn-edit {
  margin-top: 24px;
  width: 100%;
  padding: 12px;
  background: white;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  transition: background 0.2s;
}

.btn-edit:hover {
  background: #ff6600;
  color: white;
}

.edit-form .form-group {
  margin-bottom: 16px;
}

.edit-form label {
  display: block;
  color: #888;
  font-size: 0.85rem;
  margin-bottom: 6px;
}

.edit-form input {
  width: 100%;
  padding: 10px;
  background: #000;
  border: 1px solid #444;
  color: white;
  border-radius: 4px;
  box-sizing: border-box;
}

.edit-form input:focus {
  outline: none;
  border-color: #ff6600;
}

.btn-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn-save {
  flex: 1;
  padding: 12px;
  background: #ff6600;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cancel {
  flex: 1;
  padding: 12px;
  background: #333;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
