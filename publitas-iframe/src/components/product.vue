<template>
  <div class="cart-outline">
    <div v-if="result" class="cart-item">
      <div>
        <h3>{{result.product.title}}</h3>
        <p>{{result.product.description}}</p>
      </div>
      <div>
        <h3>£{{price}}</h3>
      </div>
    </div>
    <div class="cart-quantity">
      {{product.amount}}
    </div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  import { useQuery } from "@vue/apollo-composable";
  import { gql } from "@apollo/client/core"

  export default defineComponent({
    name: 'product',
    components: {

    },
    props: {
      product: Object
    },
    setup(props) {
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
      const { result, error } = useQuery(PRODUCT_QUERY)
      const price = result.product
      console.log(result)
      console.log("error")
      console.log(error)
      return {
        result,
        error,
        price
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
    min-height: 33vh;
    border: 2px solid #000;
    display:  flex;
    justify-content: space-between;
  }

  .cart-item {
    text-align:  left;
    padding: 3%;
  }

  .cart-quantity {
    text-align:  right;
    padding:  3%;
  }
</style>
