<template>
  <!-- if params exist get and display cart items -->
  <div v-if="hasParams">
    <h1>Your Cart:</h1>
    <div v-for="product in productList" :key="product.id">
      <product :product="product"></product>
    </div>
  </div>
  <!-- if no params exist display a simple error -->
  <div v-else>
    <div class="empty-cart">
      <h1>Your Cart Is Empty</h1>
      <p>Please add some products and try again?</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import product from '@/components/product.vue';
export default defineComponent({
  name: 'App',
  components: {
    product
  },
  setup(){
    // get params which represent cart items, slice off first element as it's a ?
    const rawParams = window.location.search.slice(1)
    const params = rawParams.split(",")
    // declare a ref as false and if params exist then change it to true
    const hasParams = ref(false)
    if (rawParams.length > 0) {
      hasParams.value = true
    } else {
      hasParams.value = false
    }
    // split params into array of objects so they can be looped easily
    const productList = []
    const filterParams = (array, item) => {
      return array.filter((b) => b == item).length;
    };
    params.forEach((param) => {
      const count = filterParams(params, param)
      const idArray = productList.map(function (product) {
        return product.id;
      });
      if (idArray.includes(param) === false) {
        const obj = {amount: count, id: param}
        productList.push(obj)
      }
    });
    return {
      productList,
      hasParams
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir Next, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
}
.empty-cart {
  color:  #fff;
  width: 100%;
  height: 100vh;
  padding: 16px;
  background-color: #b51313;
}
</style>
