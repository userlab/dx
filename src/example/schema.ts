import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { RoleQuery, RoleMutation } from './role'
import { UserQuery, UserMutation } from './user'

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      ...RoleQuery,
      ...UserQuery,
    }),
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      ...RoleMutation,
      ...UserMutation,
    }),
  }),
})
