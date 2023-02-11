console.log("hi")
window.viewerReady = function (api, platform) {
  api.setCartButtonAction("http://your.custom.url", "test to Cart");
  api.setProductAction(function (products) {
    console.log(products)
    api.cartContentChanged({ numItems: 3 })
  })
}
