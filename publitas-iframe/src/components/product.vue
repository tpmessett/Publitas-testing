<template>
  <div v-if="productInCart" class="cart-outline">
    <div v-if="result" class="cart-item">
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
  import { defineComponent, watch, ref } from 'vue';
  import { useQuery } from "@vue/apollo-composable";
  import { gql } from "@apollo/client/core"

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
        title: "",
        description: "",
        price: 0,
        quantity: props.product.amount,
        vairant: ""
      })
      const productInCart = ref(false)
      const PRODUCT_QUERY = gql`
      query {
        product(id: "gid://shopify/Product/${props.product.id}") {
          title
          description
          images(first: 1) {
            nodes {
              src
            }
          }
          variants(first: 10) {
            nodes {
              id
              title
              availableForSale
              compareAtPrice {
                amount
                currencyCode
              }
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
      `;
      const { result } = useQuery(PRODUCT_QUERY)
      watch(result, (returnedDetails) => {
        productDetails.value.title = returnedDetails.product.title
        productDetails.value.description = returnedDetails.product.description
        productDetails.value.price = parseFloat(returnedDetails.product.variants.nodes[0].price.amount).toFixed(2)
        const variantSplitArray = returnedDetails.product.variants.nodes[0].id.split('/')
        productDetails.value.variant = variantSplitArray[variantSplitArray.length - 1]
        productInCart.value = true
        cartBuilder()
      })
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
        emit('cart', {'variant': productDetails.value.variant, 'quantity': productDetails.value.quantity })
      }

      return {
        productDetails,
        result,
        reduceQuantity,
        increaseQuantity,
        productInCart
      }
    }
  })
</script>

<style>
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
</style>
