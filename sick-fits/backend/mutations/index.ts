import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import addToCart from './addToCart';

// A fake graphql tagged template literal to have syntax highlighting
const graphql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addToCart(productId: ID!): CartItem
    }
  `,
  resolvers: {
    Mutation: {
      addToCart,
    },
  },
});
