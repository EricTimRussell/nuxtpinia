import { defineStore } from "pinia";

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
  }),
  getters: {
    // reduce cart array into a single item to get total price
    cartTotal() {
      return this.cart.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    }
  },
  actions: {
    async getCart() {
      const data = await $fetch('http://localhost:4000/cart')
      this.cart = data
    },
    async deleteFromCart(product) {
      this.cart = this.cart.filter(p => {
        return p.id != product.id
      })
      await $fetch('http://localhost:4000/cart/' + product.id, {
        method: 'DELETE'
      })
    },
    async incQuantity(product) {
      let updatedProduct

      this.cart = this.cart.map(p => {
        if (p.id == product.id) {
          p.quantity++
          updatedProduct = p
        }
        return p
      })
      await $fetch('http://localhost:4000/cart/' + product.id, {
        method: 'PUT',
        body: JSON.stringify(updatedProduct)
      })
    }
  },
})