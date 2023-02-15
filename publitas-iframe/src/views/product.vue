<template>
  <div v-if="result" class="product-container">
    <div v-if="productDetails.image" class="image-container">
      <span class="helper"></span>
      <img :src="productDetails.image" alt="">
    </div>
    <div class="container">
      <div class="info-container">
        <div class="text-info">
          <h1>{{productDetails.title}}</h1>
          <div v-if="productDetails.fullPrice">
            <h4>Was: <span class="line-through">£{{productDetails.fullPrice}}</span></h4>
            <h4><span>Now: </span>£{{productDetails.price}}</h4>
          </div>
          <div v-else>
            <h4>£{{productDetails.price}}</h4>
          </div>
          <h4 v-if="productDetails.description">More Info:</h4>
          <p>{{productDetails.description}}</p>
        </div>
      </div>
      <div class="footer-buttons">
        <div class="add-cart">
          <div class="cart-quantity">
            <button class="button" @click="reduceQuantity()">-</button>
            <div class="amount">{{productDetails.quantity}}</div>
            <button class="button" @click="increaseQuantity()">+</button>
          </div>
          <button class="add-button" @click="addToCart()">ADD TO CART</button>
        </div>
        <button class="buy-button" @click="buyNow()">BUY NOW</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, watch, ref } from 'vue';
import getProduct from '@/services/queries';

export default defineComponent({
  name: 'Product',
  components: {
  },
  setup(){
    const productDetails = ref ({
        title: "",
        price: 0,
        quantity: 1,
      })
    const rawParams = window.location.search.slice(1)
    const result = getProduct(rawParams)
    watch(result, (returnedDetails) => {
        productDetails.value.title = returnedDetails.product.title
        productDetails.value.description = returnedDetails.product.description
        productDetails.value.price = parseFloat(returnedDetails.product.variants.nodes[0].price.amount).toFixed(2)
        if(returnedDetails.product.variants.nodes[0].compareAtPrice != null) productDetails.value.fullPrice = parseFloat(returnedDetails.product.variants.nodes[0].compareAtPrice.amount).toFixed(2)
        const variantSplitArray = returnedDetails.product.variants.nodes[0].id.split('/')
        productDetails.value.variant = variantSplitArray[variantSplitArray.length - 1]
        if (returnedDetails.product.images.nodes.length > 0) {
          productDetails.value.image = returnedDetails.product.images.nodes[0].src
        }
      })
    const buyNow = () => {
      const url = `https://pooks-treats.myshopify.com/cart/${productDetails.value.variant}:1?ref=publitas`
      window.open(url)
    }

    const reduceQuantity = () => {
        if (productDetails.value.quantity > 1) {
          productDetails.value.quantity -= 1
        }
      }
      const increaseQuantity = () => {
        productDetails.value.quantity += 1
      }

      const addToCart = () => {
        console.log("in cart")
        const itemToCart = {'product': rawParams, 'variant': productDetails.value.variant, 'quantity': productDetails.value.quantity, 'from': 'product' }
        window.parent.postMessage(JSON.stringify(itemToCart), "*")
      }

    return {
      result,
      productDetails,
      buyNow,
      increaseQuantity,
      reduceQuantity,
      addToCart
    }
  }
})
</script>

<style scoped>

  .container {
    width: 50%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .add-cart {
    display:  flex;
    justify-content:  space-between;
  }

  .cart-quantity {
      text-align:  center;
      padding:  3%;
      display:  flex;
      justify-content: space-evenly;
      font-size:  24px;
      width: 44%
    }

  h4, h1, p {
    margin: 4px;
  }

  .line-through {
    text-decoration: line-through;
  }

  .product-container {
    padding: 0;
    height: 100vh;
    width: 100%;
    display: flex;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
}

  .info-container {
    padding: 2%;
    padding-top: 24px;
    width: 96%;
  }

  .image-container {
    width: 50%;
    height: 100%;
  }

  .helper {
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }

  .text-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 85%;
    width: 100%;
    text-align: left;
  }

  .footer-buttons {
    width: 100%;
    margin-top: auto;
  }

  button {
    padding: 8px;
    width: 96%;
    margin: 2%;
    cursor: pointer;
  }

  .add-button {
    width: 46%;
    background-color: white;
    color: black;
    border: 2px solid black;
  }

  .buy-button {
    background-color: black;
    color: white;
    border: 9px solid black;
  }

  .button {
    text-align: center;
    padding:  8px;
    background-color: white;
    color: black;
    font-size:  24px;
    border: none;
  }
  .amount {
     text-align: center;
    padding:  5%;
  }

  @media (max-width: 500px) {

    p {
      font-size:  12px;
    }

     .container {
        width: 100%;
        min-height: 50%;
      }

    .product-container {
      flex-direction:  column;
    }

    .image-container {
      height: 50%;
      width: 100%;
    }

    .info-container {
      padding-top: 2%;
    }
  }
</style>
