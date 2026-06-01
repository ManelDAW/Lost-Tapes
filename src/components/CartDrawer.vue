<script setup>
import { useCartStore } from '@/stores/cartStore';
import { useRouter } from 'vue-router';
import { getImageUrl } from '@/utils/imageUrl';

const cart = useCartStore();
const router = useRouter();

const goToCheckout = () => {
  cart.open = false;
  router.push('/carrito');
};
</script>

<template>
  <!-- Overlay -->
  <div v-if="cart.open"
       class="cart-overlay"
       @click="cart.open = false">
  </div>

  <!-- Drawer -->
  <div class="cart-drawer" :class="{ 'cart-drawer--open': cart.open }">

    <!-- Cabecera -->
    <div class="cart-drawer__header">
      <span class="fw-bold" style="font-size:1.1rem;">🛒 Carrito ({{ cart.totalItems }})</span>
      <button class="btn-close-drawer" @click="cart.open = false">✕</button>
    </div>

    <!-- Vacío -->
    <div v-if="cart.items.length === 0" class="cart-drawer__empty">
      <p style="color:var(--page-muted);">Tu carrito está vacío.</p>
    </div>

    <!-- Items -->
    <div v-else class="cart-drawer__items">
      <div v-for="item in cart.items" :key="item.id" class="cart-drawer__item">
        <img :src="getImageUrl(item)" :alt="item.title"
             style="width:52px; height:72px; object-fit:cover; border-radius:4px; flex-shrink:0;" />

        <div class="flex-grow-1 mx-2">
          <p class="mb-1 small fw-bold" style="color:var(--page-text); line-height:1.3;">{{ item.title }}</p>
          <p class="mb-0 small" style="color:var(--page-muted);">{{ Number(item.price).toFixed(2) }} €</p>
        </div>

        <div class="d-flex flex-column align-items-end gap-1">
          <div class="d-flex align-items-center gap-1">
            <button class="qty-btn" @click="cart.decrement(item.id)">−</button>
            <span class="small fw-bold" style="min-width:18px; text-align:center; color:var(--page-text);">{{ item.qty }}</span>
            <button class="qty-btn" @click="cart.increment(item.id)">+</button>
          </div>
          <span class="small" style="color:var(--accent);">{{ (item.price * item.qty).toFixed(2) }} €</span>
          <button class="remove-btn" @click="cart.remove(item.id)">✕</button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div v-if="cart.items.length > 0" class="cart-drawer__footer">
      <div class="d-flex justify-content-between mb-3">
        <span class="fw-bold" style="color:var(--page-text);">Total</span>
        <span class="fw-bold fs-5" style="color:var(--accent);">{{ cart.totalPrice.toFixed(2) }} €</span>
      </div>
      <button class="btn btn-accent fw-bold w-100 rounded-pill" @click="goToCheckout">
        Finalizar compra →
      </button>
    </div>
  </div>
</template>

<style scoped>
.cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}

.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 340px;
  max-width: 92vw;
  height: 100vh;
  background: var(--page-card-bg);
  border-left: 1px solid var(--page-border);
  z-index: 1050;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.3);
}

.cart-drawer--open {
  transform: translateX(0);
}

.cart-drawer__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--page-border);
  color: var(--page-text);
}

.btn-close-drawer {
  background: none;
  border: none;
  color: var(--page-muted);
  font-size: 1.1rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
}
.btn-close-drawer:hover { color: var(--page-text); background: var(--page-border); }

.cart-drawer__empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.cart-drawer__items {
  flex: 1;
  overflow-y: auto;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.cart-drawer__item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--page-border);
}

.cart-drawer__footer {
  padding: 16px 20px;
  border-top: 1px solid var(--page-border);
}

.qty-btn {
  width: 24px;
  height: 24px;
  background: var(--page-bg);
  border: 1px solid var(--page-border);
  color: var(--page-text);
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.qty-btn:hover { border-color: var(--accent); }

.remove-btn {
  background: none;
  border: none;
  color: var(--page-muted);
  font-size: 0.75rem;
  cursor: pointer;
  padding: 0;
}
.remove-btn:hover { color: #e53935; }
</style>
