import {
  GraphQLEnumType,
  GraphQLEnumValueConfig,
  GraphQLEnumValueConfigMap,
} from 'graphql'
import { DxArgs } from '../types'

export const getOrderByType = ({ name, fields }: DxArgs): GraphQLEnumType => {
  const values: GraphQLEnumValueConfigMap = {}

  Object.keys(fields).forEach(field => {
    // Don't support orderBy by sqlExpr fields
    if (!fields[field]['sqlExpr']) {
      values[field] = { value: field } as GraphQLEnumValueConfig
    }
  })

  return new GraphQLEnumType({
    name: `${name}Field`,
    values,
  })
}
