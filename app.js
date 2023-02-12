// check the script is in place
console.log("Integration Running")

// accessing the Publitas API
window.viewerReady = function (api, platform) {

  // set custom on-click action
  api.setProductAction(function (products) {
    // get identifier to store in cart
    const identifier = products[0].webshopIdentifier
    // get current cart
    let cart = JSON.parse(localStorage.getItem('cart'))
    // check if cart exists
    if (cart == null) {
      // if it does not create it as an array with current identifier
      cart = [identifier]
    } else {
      // if it does push the current identifier. This means you can have multiples of same ID in cart, dealt with later.
      cart.push(identifier)
    }
    // push new cart to local store
    localStorage.setItem('cart', JSON.stringify(cart));
    // set number of items on cart identifier
    api.cartContentChanged({ numItems: cart.length })
  });

  // set cart button name and action
  api.setCartButtonAction(function () {
    // display cart on click

    // trigger checkout on button click

  }, "View Cart");

  // set checkout button
  api.addMenuItem({
    name: 'Checkout',
    title: 'Checout Now',
    iconUrl: 'https://res.cloudinary.com/dnkpuuudm/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1676221241/Screenshot_2023-02-12_at_15.54.22_vmkaqh.jpg',
    action: function(){

    },
    order: 2,
  });

  // Set Euros to GBP symbols

  // Change got to webshop to "add to cart"
}
// <script src="https://cdn.jsdelivr.net/gh/tpmessett/publitas-testing/app.js"></script>
