<template>
  <p>{{product}}</p>
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
        query getProductById {
          product(handle: "${props.id}") {
            id
            title
            description
            variants(first: 5) {
              edges {
                cursor
                node {
                  id
                  title
                  quantityAvailable
                  price {
                    amount
                    currencyCode
                  }
                  media(first: 1) {
                    edges {
                      node {
                        alt
                        image {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;
      const { result, error } = useQuery(PRODUCT_QUERY)
      console.log(result)
      console.log(error)
      return {

      }
    }
  })
</script>

<style>

</style>
