<template>
  <div v-if="productInCart" class="cart-outline">
    <div class="cart-item">
      <div>
        <h3>{{productDetails.title}}</h3>
        <p>{{productDetails.description}}</p>
      </div>
      <div>
        <h3>£{{productDetails.price}}</h3>
      </div>
    </div>
    <div class="cart-quantity">
      <button class="button" @click="reduceQuantity()">-</button>
      <div class="amount">{{productDetails.quantity}}</div>
      <button class="button" @click="increaseQuantity()">+</button>
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref } from 'vue';
  import getProduct from '@/services/queries';
  export default defineComponent({
    name: 'product',
    emits: ['cart'],
    components: {

    },
    props: {
      product: Object
    },
    setup(props, { emit }) {
      const productDetails = ref ({
        quantity: props.product.quantity,
        title: "",
        description: "",
        price: 0.00,
        variant: props.product.variant
      })

      const productInCart = ref(false)
      const result = async () => {
        getProduct(props.product.id).then(function(result) {
          console.log('returned')
          console.log(result.product)
          productDetails.value.title = result.product.title
          productDetails.value.description = result.product.description
          productDetails.value.price = getIndex(result.product.variants.nodes)
          //productDetails.value.price = parseFloat(returnedDetails.product.variants.nodes[0].price.amount).toFixed(2)
          productInCart.value = true
          cartBuilder()
        })
      }
      result()

      const getIndex = (array) => {
        let price = 0.0
        array.forEach(item => {
          const splitArray = item.id.split('/')
          if(props.product.variant === splitArray[splitArray.length - 1]) {
            price = parseFloat(item.price.amount).toFixed(2)
          }
        })
        return price
      }

      const reduceQuantity = () => {
        productDetails.value.quantity -= 1
        if (productDetails.value.quantity < 1) {
          productInCart.value = false
        }
        cartBuilder()
      }
      const increaseQuantity = () => {
        productDetails.value.quantity += 1
        cartBuilder()
      }
      const cartBuilder = () => {
        const itemToCart = {'product': props.product.id, 'variant': productDetails.value.variant, 'quantity': productDetails.value.quantity, 'from': 'cart' }
        emit('cart', itemToCart)
        window.parent.postMessage(JSON.stringify(itemToCart), "*")
      }

      return {
        productDetails,
        reduceQuantity,
        increaseQuantity,
        productInCart
      }
    }
  })
</script>

<style scoped>
  h1 {
    margin: 2%;
    font-size: 22px;
  }

  .cart-outline {
    margin: 1% 5%;
    width: 90%;
    border: 2px solid #000;
    display:  flex;
    justify-content: space-between;
  }

  .cart-item {
    text-align:  left;
    padding: 3%;
  }

  .cart-quantity {
    text-align:  center;
    padding:  3%;
    display:  flex;
    justify-content: space-evenly;
    font-size:  24px;
    min-width: 20%
  }

  .button {
    display:  flex;
    flex-direction: column;
    justify-content:  center;
    padding:  10%;
    background-color: white;
    color: black;
    font-size:  24px;
    border: none;
  }
  .amount {
    display:  flex;
    flex-direction: column;
    justify-content:  center;
    padding:  10%;
  }

  button {
    cursor: pointer;
  }
</style>
