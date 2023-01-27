<template>
  <div>
    <h2 class="text-white text-3xl text-center my-8 underline">Your Cart</h2>
    <div class="card-cart text-xl" v-if="cartStore.cart.length">

      <!--cart product list  -->
      <div v-for="product in cartStore.cart" class="flex gap-8 items-center border-solid border-2 my-2">
        <img :src="product.img" :alt="product.title">
        <p class="text-white">{{ product.title }}</p>

        <!-- product quantity -->
        <ProductQuantity :product="product" />
        <p class="text-white">{{ product.price * product.quantity }} coins</p>

        <!-- Remove item from cart -->
        <button class="ml-auto mr-5" @click="cartStore.deleteFromCart(product)">
          <span class="material-symbols-outlined text-white hover:text-red-700">delete</span>
        </button>
      </div>
    </div>

    <div v-else>
      <p class="text-white text-2xl text-center">No Items in your Cart</p>
    </div>

    <!-- Cart Total -->
    <div class="flex justify-between text-xl pt-4 mt-4 border-t-2" v-if="cartStore.cartTotal.length == 0">
      <button class="text-secondary hover:scale-125">
        <span class="material-symbols-outlined">shopping_cart_checkout</span>
      </button>
      <span class="text-secondary"><span class="text-white">Total: </span> {{ cartStore.cartTotal }} Silver</span>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cartStore";
const cartStore = useCartStore()
</script>

<style scoped>

</style>