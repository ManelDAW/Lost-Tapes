<script setup>
import { computed, ref } from 'vue';
import { useMovieStore } from '@/stores/movieStore';

const movieStore = useMovieStore();
const user = computed(() => movieStore.user);

const editMode = ref(false);
const editedName = ref(user.value?.name || '');
const editedEmail = ref(user.value?.email || '');

const saveChanges = () => {
  movieStore.setUser({ ...user.value, name: editedName.value, email: editedEmail.value });
  editMode.value = false;
};

const roleLabel = { admin: 'Administrador', vendedor: 'Vendedor', editor: 'Editor', user: 'Usuario' };
</script>

<template>
  <div class="d-flex justify-content-center py-5" style="min-height:100vh;">
    <div class="w-100" style="max-width:500px;">
      <div class="card border-0 overflow-hidden" style="background:#111; border:1px solid #333 !important;">

        <!-- Cabecera -->
        <div class="card-header d-flex align-items-center gap-3 py-4 px-4"
             style="background:#1a1a1a; border-bottom:1px solid #333;">
          <div class="rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
               style="width:64px; height:64px; background:#ff6600; color:white; font-size:1.8rem;">
            {{ user?.name?.charAt(0).toUpperCase() }}
          </div>
          <div>
            <h5 class="text-white mb-1">{{ user?.name }}</h5>
            <span class="badge rounded-pill text-white" style="background:#ff6600; font-size:0.75rem;">
              {{ roleLabel[user?.role] || user?.role }}
            </span>
          </div>
        </div>

        <!-- Cuerpo -->
        <div class="card-body px-4 py-4 text-white">
          <div v-if="!editMode">
            <div class="d-flex justify-content-between py-3 border-bottom" style="border-color:#222 !important;">
              <span style="color:#888;">Nombre</span>
              <span>{{ user?.name }}</span>
            </div>
            <div class="d-flex justify-content-between py-3 border-bottom" style="border-color:#222 !important;">
              <span style="color:#888;">Email</span>
              <span>{{ user?.email }}</span>
            </div>
            <div class="d-flex justify-content-between py-3">
              <span style="color:#888;">Rol</span>
              <span>{{ roleLabel[user?.role] || user?.role }}</span>
            </div>
            <button class="btn btn-light w-100 fw-bold text-uppercase mt-4" @click="editMode = true">
              Editar perfil
            </button>
          </div>

          <div v-else>
            <div class="mb-3">
              <label class="form-label fw-bold" style="color:#888;">Nombre</label>
              <input v-model="editedName" type="text" class="form-control"
                     style="background:#000; border-color:#444; color:white;" />
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold" style="color:#888;">Email</label>
              <input v-model="editedEmail" type="email" class="form-control"
                     style="background:#000; border-color:#444; color:white;" />
            </div>
            <div class="d-flex gap-2 mt-4">
              <button class="btn btn-accent flex-fill fw-bold" @click="saveChanges">Guardar</button>
              <button class="btn btn-secondary flex-fill fw-bold" @click="editMode = false">Cancelar</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
