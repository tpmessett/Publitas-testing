// check the script is in place
console.log("Integration Running")

// accessing the Publitas API
window.viewerReady = function (api, platform) {
  // check if any cart exists in local store and set length appropriately
  const setCartLength = () => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    if (cart != null && cart.length > 0) {
      api.cartContentChanged({ numItems: cart.length })
    } else {
      // set to 0 if cart cannot be found
      api.cartContentChanged({ numItems: 0 })
    }
  }
  setCartLength()

  // set custom on-click action to open custom product page
  api.setProductAction(function (products) {
    // get identifier to store in cart
    const identifier = products[0].webshopIdentifier
    console.log(identifier)
    url = `https://main--sparkly-buttercream-3719ff.netlify.app/product/?${identifier}`
    openIframe(url)
  });

  // set cart button name and action
  api.setCartButtonAction(function () {
    // get cart
    const cart = JSON.parse(localStorage.getItem('cart'))
    // pass cart items to URL to load
    url = `https://main--sparkly-buttercream-3719ff.netlify.app/?${cart}`
    // display cart on click
    openIframe(url)
  }, "View Cart");

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
    },
    order: 3,
  });

  const openIframe = (url) => {
    const options = {
        background: '#ffffff'
      };
    api.showExternalContent(url, options);
  }
}


const buildUrl = (cart) => {
  const counts = buildItemList(cart)
  // create URL to pass to shopify
  let url = "https://pooks-treats.myshopify.com/cart/"
  for (const item in counts) {
    // set params in way required by shopify
    const param = `${item}:${counts[item]},`
    // add params to URL
    url = url + param
  }
  // add ref for ecom tracking
  return url + '?ref=publitas'
}

const buildItemList = (cart) => {
  // create object to pass to shopify (it needs ID and amount to construct URL)
  const counts = {};
  // loop through cart array and fill counts with object with a count incrementing each time item is found
  for (const num of cart) {
    counts[num] = (counts[num] || 0) + 1;
  }
  return counts
}

const trustedOrigin = "https://main--sparkly-buttercream-3719ff.netlify.app";

window.addEventListener("message", onMsg, false);

function onMsg(msg) {
  if (!trustedOrigin.includes(msg.origin)){
    return
  };
  const data = JSON.parse(msg.data)
  if (data.from === "product") {
    const button = document.getElementById('popup_close')
    const secondButton = document.querySelectorAll('button[aria-label="Close"]')
    if(button === null){
      secondButton[0].click()
    }
    else {
      button.click()
    }
    console.log("done");
  }
}


// <script src="https://cdn.jsdelivr.net/gh/tpmessett/publitas-testing/embed.js"></script>
