import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//import VueApollo from "vue-apollo";

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: 'https://pooks-treats.myshopify.com/api/2023-01/graphql.json',
  headers: {
  'X-Shopify-Storefront-Access-Token': process.env.VUE_APP_SHOPIFY_ACCESS_TOKEN,
    }
 });
// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const app = createApp(App).use(router).provide(DefaultApolloClient, apolloClient)


app.mount('#app')
