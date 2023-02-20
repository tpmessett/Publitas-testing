import {mount} from '@vue/test-utils';
import cartPreview from '@/components/cartPreview.vue'


jest.mock('@/services/queries', () => () => {
  return {
  "data": {
    "product": {
      "title": "Animal crackers",
      "description": "Will drive your dog crackers with the Peanut Butter taste",
      "images": {
        "nodes": [
          {
            "src": "https://cdn.shopify.com/s/files/1/0718/2031/2858/products/7145518PL.jpg?v=1676067996",
            "__typename": "Image"
          }
        ],
        "__typename": "ImageConnection"
      },
      "variants": {
        "nodes": [
          {
            "id": "gid://shopify/ProductVariant/44481723171098",
            "title": "Default Title",
            "availableForSale": true,
            "compareAtPrice": {
              "amount": "7.0",
              "currencyCode": "GBP",
              "__typename": "MoneyV2"
            },
            "price": {
              "amount": "5.0",
              "currencyCode": "GBP",
              "__typename": "MoneyV2"
            },
            "__typename": "ProductVariant"
          }
        ],
        "__typename": "ProductVariantConnection"
      },
      "__typename": "Product"
    }
  }
}
});

// describe('cartPreview.vue', () => {
//   let wrapper

//   beforeEach(() => {
//     wrapper = mount(cartPreview, {
//       props: {
//         product: {
//           id: '1',
//           quantity: 2,
//           variant: 'red'
//         }
//       }
//     })
//   })

//   it('renders the product details correctly', async () => {
//     // Mock the getProduct function
//     const mockProduct = {
//       product: {
//         title: 'Test Product',
//         description: 'This is a test product',
//         variants: {
//           nodes: [
//             {
//               id: '/products/1/variants/red',
//               price: {
//                 amount: '10.00'
//               }
//             }
//           ]
//         }
//       }
//     }
//     const getProduct = jest.fn(() => Promise.resolve(mockProduct))
//     wrapper.vm.$options.setup[0](wrapper.props(), { emit: jest.fn() }, { getProduct })
//     await wrapper.vm.$nextTick()

//     // Assert that the product details are rendered correctly
//     expect(wrapper.find('h3').text()).toBe('Test Product')
//     expect(wrapper.find('p').text()).toBe('This is a test product')
//     expect(wrapper.find('.amount').text()).toBe('2')
//     expect(wrapper.find('.cart-outline').isVisible()).toBe(true)
//   })

//   it('emits a cart event when the quantity is increased', async () => {
//     const button = wrapper.find('.cart-quantity button:last-child')
//     button.trigger('click')
//     await wrapper.vm.$nextTick()

//     expect(wrapper.emitted('cart')).toBeTruthy()
//     expect(wrapper.emitted('cart').length).toBe(1)
//     expect(wrapper.emitted('cart')[0][0]).toEqual({
//       product: '1',
//       variant: 'red',
//       quantity: 3,
//       from: 'cart'
//     })
//   })

//   it('emits a cart event when the quantity is reduced', async () => {
//     const button = wrapper.find('.cart-quantity button:first-child')
//     button.trigger('click')
//     await wrapper.vm.$nextTick()

//     expect(wrapper.emitted('cart')).toBeTruthy()
//     expect(wrapper.emitted('cart').length).toBe(1)
//     expect(wrapper.emitted('cart')[0][0]).toEqual({
//       product: '1',
//       variant: 'red',
//       quantity: 1,
//       from: 'cart'
//     })
//   })
// })


describe('cartPreview.vue', () => {
  it('renders the correct amount for a product', async () => {
        const mockProduct = {
      "data": {
        "product": {
          "title": "Animal crackers",
          "description": "Will drive your dog crackers with the Peanut Butter taste",
          "images": {
            "nodes": [
              {
                "src": "https://cdn.shopify.com/s/files/1/0718/2031/2858/products/7145518PL.jpg?v=1676067996",
                "__typename": "Image"
              }
            ],
            "__typename": "ImageConnection"
          },
          "variants": {
            "nodes": [
              {
                "id": "gid://shopify/ProductVariant/44481723171098",
                "title": "Default Title",
                "availableForSale": true,
                "compareAtPrice": {
                  "amount": "7.0",
                  "currencyCode": "GBP",
                  "__typename": "MoneyV2"
                },
                "price": {
                  "amount": "5.0",
                  "currencyCode": "GBP",
                  "__typename": "MoneyV2"
                },
                "__typename": "ProductVariant"
              }
            ],
            "__typename": "ProductVariantConnection"
          },
          "__typename": "Product"
        }
      }
    }
    const getProduct = jest.fn(() => Promise.resolve('@/services/queries'))
    const wrapper = mount(cartPreview, {
      propsData:
        {
          product: {
          id: "8109412516122",
          quantity: 10,
          variant: "44481714192666"
        }
       }
    });
    expect(productDetails.value.quantity).toBe(10);
  })
  it('renders cart outline div', async () => {
    const mockProduct = {
      "data": {
        "product": {
          "title": "Animal crackers",
          "description": "Will drive your dog crackers with the Peanut Butter taste",
          "images": {
            "nodes": [
              {
                "src": "https://cdn.shopify.com/s/files/1/0718/2031/2858/products/7145518PL.jpg?v=1676067996",
                "__typename": "Image"
              }
            ],
            "__typename": "ImageConnection"
          },
          "variants": {
            "nodes": [
              {
                "id": "gid://shopify/ProductVariant/44481723171098",
                "title": "Default Title",
                "availableForSale": true,
                "compareAtPrice": {
                  "amount": "7.0",
                  "currencyCode": "GBP",
                  "__typename": "MoneyV2"
                },
                "price": {
                  "amount": "5.0",
                  "currencyCode": "GBP",
                  "__typename": "MoneyV2"
                },
                "__typename": "ProductVariant"
              }
            ],
            "__typename": "ProductVariantConnection"
          },
          "__typename": "Product"
        }
      }
    }
    const getProduct = jest.fn(() => Promise.resolve(mockProduct))
    const wrapper = mount(cartPreview, {
      propsData:
        {
          product: {
          id: "8109412516122",
          quantity: 10,
          variant: "44481714192666"
        }
       }
    });
    expect(wrapper.find('.cart-outline').exists()).toBeTruthy()
  })
})
