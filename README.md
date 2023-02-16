# Publitas-testing
Testing publitas integrations with Shopify. This basic app allows people to add items to their cart and check out from the publitas app. It's linked up to my test store right now.

The app uses:
- Vue 3
- Yarn
- Apollo (for GraphQL)

### Getting Started
1. Embed the embed.js file on your publitas catalog page, first change the URL if you don't want to use my test store. I recommend using a CDN to host. 
2. Make sure you have Node 14+, Vue 3 and Yarn install
3. CD publitas-iframe
4. Yarn install
5. Yarn Serve

### Watch outs:
Shopify API key is stored in an ENV variable, you will need your own.

