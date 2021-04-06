import {
  GraphQLEnumType,
  GraphQLFieldConfig,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} from 'graphql'
import { getConnectionConfig } from '../types'
import { sortKeyResolve } from './sortKeyResolve'
import { whereResolve } from './whereResolve'
import { joinMonsterResolve } from './joinMonsterResolve'

export const OrderEnumType = new GraphQLEnumType({
  name: 'OrderEnum',
  values: {
    DESC: { value: 'DESC' },
    ASC: { value: 'ASC' },
  },
})

export const getConnection = ({
  connectionType,
  orderByType,
  whereType,
  fields,
  uniqueKey,
  defaultOrderBy,
}: getConnectionConfig): GraphQLFieldConfig<any, any> => {
  return {
    type: connectionType,
    args: {
      after: { type: GraphQLString },
      first: { type: GraphQLInt, defaultValue: 20 },
      before: { type: GraphQLString },
      last: { type: GraphQLInt },
      order: { type: OrderEnumType, defaultValue: 'DESC' },
      orderBy: {
        type: new GraphQLList(orderByType),
        defaultValue: defaultOrderBy,
      },
      where: { type: whereType },
    },
    extensions: {
      joinMonster: {
        sqlPaginate: true,
        sortKey: sortKeyResolve({ fields, uniqueKey }),
        where: whereResolve({ fields }),
      },
    },
    resolve: joinMonsterResolve,
  }
}
