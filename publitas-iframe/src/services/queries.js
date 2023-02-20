import { gql } from "@apollo/client/core"
import { useQuery } from "@vue/apollo-composable";

export default async function getProduct(id){
  const PRODUCT_QUERY = gql`
      query {
        product(id: "gid://shopify/Product/${id}") {
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
  const { result, error } = useQuery(PRODUCT_QUERY)
  console.log(error)
  return result
}
