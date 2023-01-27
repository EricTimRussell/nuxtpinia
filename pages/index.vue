<template>
  <div>
    <h2 class="text-white text-3xl text-center my-8">All Products</h2>
    <div class="grid grid-cols-2 gap-7 text-white">
      <div v-for="product in products">
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup>
// fetch products
const { data: products } = await useFetch('http://localhost:4000/products')
</script>

<style scoped>

</style>