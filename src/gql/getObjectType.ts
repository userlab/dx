import { GraphQLObjectType } from 'graphql'
import { DxArgs } from '../types'
import { setExtension } from './setExtension'

export const getObjectType = ({
  name,
  description,
  table,
  uniqueKey,
  fields,
  relations,
}: DxArgs): GraphQLObjectType => {
  const objectType = new GraphQLObjectType({
    name,
    description,
    fields: () => ({
      ...setExtension(fields),
      ...setExtension(relations ? relations() : {}),
    }),
    extensions: {
      joinMonster: {
        sqlTable: table,
        uniqueKey,
      },
    },
  })

  return objectType
}
