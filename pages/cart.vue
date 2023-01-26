<template>
  <div>
    <h2 class="text-white text-2xl text-center my-8">Your Cart</h2>
    <div class="card text-xl" v-if="cartStore.cart.length">
      <!--cart product list  -->
      <div v-for="product in cartStore.cart" class="flex gap-8 items-center border-solid border-2 my-2">
        <img :src="product.img" :alt="product.title">
        <p class="text-white">{{ product.title }}</p>
        <p class="text-white">{{ product.price * product.quantity }} coins</p>
      </div>
    </div>

    <div v-else>
      <p class="text-white">No Items in Cart</p>
    </div>

    <!-- Cart Total -->
    <div class="text-right pt-4 mt-4 border-t-2">
      <span class="text-white">Total:</span>
      <span class="text-secondary">{{ cartStore.cartTotal }}</span>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cartStore";
const cartStore = useCartStore()
</script>

<style scoped>

</style>