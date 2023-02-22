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
    const getProduct = jest.fn(() => Promise.resolve('@/services/queries'))
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
    const getProduct = jest.fn(() => Promise.resolve('@/services/queries'))
    expect(wrapper.find('.cart-outline').exists()).toBeTruthy()
  })
})
