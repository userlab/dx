import {
  GraphQLInputFieldConfigMap,
  GraphQLInputObjectType,
  GraphQLList,
} from 'graphql'
import { DxArgs } from '../types'
import { operators } from '../constants'

export const ConditionInputType = new GraphQLInputObjectType({
  name: 'ConditionInputType',
  fields: () => operators,
})

export const getWhereType = ({
  name,
  fields,
}: DxArgs): GraphQLInputObjectType => {
  const whereFields: GraphQLInputFieldConfigMap = {}

  Object.keys(fields).forEach(name => {
    whereFields[name] = { type: ConditionInputType }
  })

  const whereType: GraphQLInputObjectType = new GraphQLInputObjectType({
    name: `${name}Where`,
    fields: () => ({
      and: { type: new GraphQLList(whereType) },
      or: { type: new GraphQLList(whereType) },
      ...whereFields,
    }),
  })

  return whereType
}
