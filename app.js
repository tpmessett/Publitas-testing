// check the script is in place
console.log("Integration Running")

// accessing the Publitas API
window.viewerReady = function (api, platform) {
  // check if any cart exists in local store and set length appropriately
  const setCartLength = () => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    if (cart != null && cart.length > 0) {
      api.cartContentChanged({ numItems: cart.length })
    }
  }
  setCartLength()
  // set custom on-click action
  api.setProductAction(function (products) {
    // get identifier to store in cart
    const identifier = products[0].webshopIdentifier
    console.log(identifier)
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
    setCartLength()
  });

  // set cart button name and action
  api.setCartButtonAction(function () {
    // display cart on click

    // trigger checkout on button click

  }, "View Cart");

  // Set Euros to GBP symbols

  // Change got to webshop to "add to cart"

  // set checkout button
  api.addMenuItem({
    name: 'Checkout',
    title: 'Checkout Now',
    iconUrl: 'https://res.cloudinary.com/dnkpuuudm/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1676221241/Screenshot_2023-02-12_at_15.54.22_vmkaqh.jpg',
    action: function(){
      // get cart from local store
      const cart = JSON.parse(localStorage.getItem('cart'))
      // check cart exists
      if(cart == null) {
        // display warning user has no cart to checkout with
        console.log("empty cart")
      } else {
        //call function to create URL
        url = buildUrl(cart)
        // open URL in new tab
        window.open(url);
      }
    },
    order: 2,
  });

  api.addMenuItem({
    name: 'Empty Cart',
    title: 'Empty Cart',
    iconUrl: 'https://res.cloudinary.com/dnkpuuudm/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1676225945/102661_eldii4.jpg',
    action: function(){
      // clear cart from local store
      localStorage.removeItem('cart');
      // call function to update count of items
      setCartLength()
      console.log("emptied cart")
    },
    order: 3,
  });
}


const buildUrl = (cart) => {
  // create object to pass to shopify (it needs ID and amount to construct URL)
  const counts = {};
  // loop through cart array and fill counts with object with a count incrementing each time item is found
  for (const num of cart) {
    counts[num] = (counts[num] || 0) + 1;
  }
  // create URL to pass to shopify
  let url = "https://pooks-treats.myshopify.com/cart/"
  for (const item in counts) {
    // set params in way required by shopify
    const param = `${item}:${counts[item]},`
    // add params to URL
    url = url + param
  }
  return url
}

// <script src="https://cdn.jsdelivr.net/gh/tpmessett/publitas-testing/app.js"></script>
