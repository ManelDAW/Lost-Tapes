<script setup>
import { useCartStore } from '@/stores/cartStore';
import { useRouter } from 'vue-router';
import { getImageUrl } from '@/utils/imageUrl';
import { ref } from 'vue';

const cart = useCartStore();
const router = useRouter();
const ordered = ref(false);

const checkout = () => {
  cart.clear();
  ordered.value = true;
};
</script>

<template>
  <div class="container py-5" style="max-width:780px;">
    <h1 class="fw-bold mb-4" style="font-size:clamp(1.4rem, 4vw, 2rem); color:var(--page-text);">Tu carrito</h1>

    <!-- Vacío -->
    <div v-if="ordered" class="text-center py-5">
      <div class="fs-1 mb-3">✅</div>
      <h4 class="fw-bold mb-2" style="color:var(--page-text);">¡Pedido realizado!</h4>
      <p style="color:var(--page-muted);">Gracias por tu compra. Recibirás confirmación por email.</p>
      <button class="btn btn-accent fw-bold mt-3" @click="router.push('/productos')">
        Seguir comprando
      </button>
    </div>

    <div v-else-if="cart.items.length === 0" class="text-center py-5">
      <div class="fs-1 mb-3">🛒</div>
      <p style="color:var(--page-muted);">Tu carrito está vacío.</p>
      <button class="btn btn-accent fw-bold mt-2" @click="router.push('/productos')">
        Ver catálogo
      </button>
    </div>

    <!-- Artículos -->
    <div v-else>
      <div class="d-flex flex-column gap-3 mb-4">
        <div v-for="item in cart.items" :key="item.id"
             class="d-flex align-items-center gap-3 p-3 rounded"
             style="background:var(--page-card-bg); border:1px solid var(--page-border);">

          <!-- Imagen -->
          <img :src="getImageUrl(item)" :alt="item.title" loading="lazy"
               style="width:64px; height:90px; object-fit:cover; border-radius:4px; flex-shrink:0;" />

          <!-- Info -->
          <div class="flex-grow-1">
            <p class="fw-bold mb-1 small" style="color:var(--page-text);">{{ item.title }}</p>
            <p class="mb-0 small" style="color:var(--page-muted);">{{ Number(item.price).toFixed(2) }} €/ud.</p>
          </div>

          <!-- Cantidad -->
          <div class="d-flex align-items-center gap-2">
            <button class="btn btn-sm btn-outline-secondary" @click="cart.decrement(item.id)">−</button>
            <span class="fw-bold" style="min-width:24px; text-align:center; color:var(--page-text);">{{ item.qty }}</span>
            <button class="btn btn-sm btn-outline-secondary" @click="cart.increment(item.id)">+</button>
          </div>

          <!-- Subtotal -->
          <p class="fw-bold mb-0 ms-2" style="min-width:70px; text-align:right; color:var(--page-text);">
            {{ (item.price * item.qty).toFixed(2) }} €
          </p>

          <!-- Eliminar -->
          <button class="btn btn-sm btn-outline-danger ms-1" @click="cart.remove(item.id)" title="Eliminar">✕</button>
        </div>
      </div>

      <!-- Resumen -->
      <div class="p-4 rounded mb-4"
           style="background:var(--page-card-bg); border:1px solid var(--page-border);">
        <div class="d-flex justify-content-between mb-2">
          <span style="color:var(--page-muted);">Artículos ({{ cart.totalItems }})</span>
          <span style="color:var(--page-text);">{{ cart.totalPrice.toFixed(2) }} €</span>
        </div>
        <div class="d-flex justify-content-between mb-3">
          <span style="color:var(--page-muted);">Envío</span>
          <span style="color:#4caf50; font-weight:bold;">Gratis</span>
        </div>
        <div class="d-flex justify-content-between fw-bold fs-5 border-top pt-3"
             style="border-color:var(--page-border) !important; color:var(--page-text);">
          <span>Total</span>
          <span style="color:var(--accent);">{{ cart.totalPrice.toFixed(2) }} €</span>
        </div>
      </div>

      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary flex-fill" @click="router.push('/productos')">
          ← Seguir comprando
        </button>
        <button class="btn btn-accent fw-bold flex-fill" @click="checkout">
          Finalizar compra
        </button>
      </div>
    </div>
  </div>
</template>
