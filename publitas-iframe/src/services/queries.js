import { gql } from "@apollo/client/core"

export const PRODUCT_QUERY = gql`
      query($id: ID!) {
        product(id: $id) {
          title
          description
          images(first: 1) {
            nodes {
              src
            }
          }
          variants(first: 10) {
            nodes {
              id
              title
              availableForSale
              compareAtPrice {
                amount
                currencyCode
              }
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
      `;
