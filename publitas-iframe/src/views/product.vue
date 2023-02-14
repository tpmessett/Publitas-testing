<template>
  <div>hi</div>

</template>

<script>
import { defineComponent } from 'vue';
import { useQuery } from "@vue/apollo-composable";
import { gql } from "@apollo/client/core"

export default defineComponent({
  name: 'Product',
  components: {
  },
  setup(){
    const rawParams = window.location.search.slice(1)
    console.log(rawParams)
    const PRODUCT_QUERY = gql`
      query {
        product(id: "gid://shopify/Product/${rawParams}") {
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
    const { result, error } = useQuery(PRODUCT_QUERY, {
      variables: { id: rawParams}
    })
    console.log(result)
    console.log(error)
    return {

    }
  }
})
</script>

<style>

</style>
