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
    },
    numberOfProducts() {
      return this.cart.reduce((total, item) => {
        return total + item.quantity
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
    },
    async decQuantity(product) {
      let updatedProduct

      this.cart = this.cart.map(p => {
        if (p.id == product.id && p.quantity > 1) {
          p.quantity--
          updatedProduct = p
        }
        return p
      })
      if (updatedProduct) {
        await $fetch('http://localhost:4000/cart/' + product.id, {
          method: 'PUT',
          body: JSON.stringify(updatedProduct)
        })
      }
    },
    async addToCart(product) {
      const exists = this.cart.find(p => p.id == product.id)
      // If product is already present in cart increase quantity
      if (exists) {
        this.incQuantity(product)
      }

      if (!exists) {
        this.cart.push({ ...product, quantity: 1 })
        await $fetch('http://localhost:4000/cart', {
          method: 'POST',
          body: JSON.stringify({ ...product, quantity: 1 })
        })
      }
    }
  }
})