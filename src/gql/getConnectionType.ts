import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

export const PageInfoType = new GraphQLObjectType({
  name: 'PageInfo',
  fields: () => ({
    hasNextPage: { type: new GraphQLNonNull(GraphQLBoolean) },
    hasPreviousPage: { type: new GraphQLNonNull(GraphQLBoolean) },
    startCursor: { type: GraphQLString },
    endCursor: { type: GraphQLString },
  }),
})

export const getConnectionType = (
  objectType: GraphQLObjectType
): GraphQLObjectType => {
  const edgeType = new GraphQLObjectType({
    name: `${objectType.name}Edge`,
    fields: () => ({
      node: { type: objectType },
      cursor: { type: new GraphQLNonNull(GraphQLString) },
    }),
  })

  const connectionType = new GraphQLObjectType({
    name: `${objectType.name}Connection`,
    fields: () => ({
      pageInfo: { type: new GraphQLNonNull(PageInfoType) },
      edges: { type: new GraphQLList(edgeType) },
    }),
  })

  return connectionType
}
