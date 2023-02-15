<template>
  <!-- if params exist get and display cart items -->
  <div v-if="hasParams">
    <div>
      <h1>Your Cart:</h1>
    </div>
    <div v-for="product in productList" :key="product.id">
      <cart-preview :product="product" @cart="buildCart"></cart-preview>
    </div>
    <button class="checkout-button" @click="checkout()">
      <strong>CHECKOUT NOW</strong>
    </button>
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
import cartPreview from '@/components/cartPreview.vue';
export default defineComponent({
  name: 'Cart',
  components: {
    cartPreview
  },
  setup(){
    // get params which represent cart items, slice off first element as it's a ?
    const cartItems = ref([])
    const buildCart = (product) => {
      const productIndex = cartItems.value.findIndex(i => i.variant === product.variant)
      if(productIndex === -1){
        cartItems.value.push(product)
      } else if (productIndex != -1 && product.quantity === 0) {
        cartItems.value.splice(productIndex, 1)
      }
      else {
        cartItems.value[productIndex] = product
      }
    }
    const rawParams = window.location.search.slice(1)
    const params = rawParams.split(",")
    console.log(rawParams)
    console.log(rawParams.length)
    console.log(params)
    // declare a ref as false and if params exist then change it to true
    const hasParams = ref(false)
    if (rawParams != null || rawParams.length > 0) {
      hasParams.value = true
    } else {
      hasParams.value = false
    }
    console.log(hasParams)
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
    const checkout = () => {
      let url = "https://pooks-treats.myshopify.com/cart/"
      cartItems.value.forEach((item) => {
        url = url + `${item.variant}:${item.quantity},`
      })
      url = url + '?ref=publitas'
      window.open(url)
    }
    return {
      productList,
      hasParams,
      buildCart,
      checkout
    }
  }
})
</script>

<style>
.empty-cart {
  color:  #fff;
  width: 100%;
  height: 100vh;
  padding: 16px;
  background-color: #b51313;
}

.checkout-button {
  color: white;
  background-color:  black;
  padding: 8px;
  width: 100%;
  min-height: 40px;
  border:  none;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
