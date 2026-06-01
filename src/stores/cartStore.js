import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart') ?? '[]'),
    open: false,
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, i) => sum + i.qty, 0),
    totalPrice: (state) => state.items.reduce((sum, i) => sum + i.price * i.qty, 0),
  },

  actions: {
    add(movie) {
      const existing = this.items.find(i => i.id === movie.id)
      if (existing) {
        existing.qty++
      } else {
        this.items.push({ id: movie.id, title: movie.title, price: movie.price, image: movie.image, qty: 1 })
      }
      this._save()
    },

    remove(id) {
      this.items = this.items.filter(i => i.id !== id)
      this._save()
    },

    increment(id) {
      const item = this.items.find(i => i.id === id)
      if (item) { item.qty++; this._save() }
    },

    decrement(id) {
      const item = this.items.find(i => i.id === id)
      if (!item) return
      if (item.qty <= 1) this.remove(id)
      else { item.qty--; this._save() }
    },

    clear() {
      this.items = []
      this._save()
    },

    _save() {
      localStorage.setItem('cart', JSON.stringify(this.items))
    },
  },
})
