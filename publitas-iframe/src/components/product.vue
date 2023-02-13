<template>
  <p>{{product}}</p>
</template>

<script>
  import { defineComponent } from 'vue';
  import { useQuery, useResult } from "@vue/apollo-composable";
  import { gql } from "@apollo/client/core"

  export default defineComponent({
    name: 'product',
    components: {

    },
    props: {
      product: Object
    },
    setup(props) {

      return {

      }
    }
  })
</script>

<style>

</style>
